import path from 'node:path';
import glob from 'glob';
import { isErrorWithCode, isFileSync } from './utilities';
import { GlobImportFilter, GlobImportOptions, PACKAGE_JSON, re_definitelyTyped } from './globimport';

/**
 * Import modules matching glob, optionally filtering.
 * By default Definitely Typed modules are excluded.
 * @param pattern The glob pattern to use.
 * @param filter The filter callback to use. Optional.
 * @param options The options for the import. Optional.
 * @returns An object with module names as key and the imported module as the value.
 */
export function globImportSync(pattern: string, filter?: GlobImportFilter, options?: GlobImportOptions): Record<string, unknown> {
    const globOptions = options?.globOptions ?? {};
    const excludeDefinitelyTyped = options?.excludeDefinitelyTyped ?? true;
    const modules: Record<string, unknown> = {};
    const nodePath = process?.env?.NODE_PATH ?? '';
    const pathPaths = nodePath.split(path.delimiter);
    const requirePaths = require.main?.paths ?? [];
    const searchPaths = ([] as string[]).concat(requirePaths, pathPaths)
        .filter(_ => !!_);
    for (const searchFolder of searchPaths) {
        const matches = glob.sync(pattern, {
            cwd: searchFolder,
            ...globOptions,
        });
        for (const matchName of matches) {
            const moduleFolder = path.join(searchFolder, matchName);
            const packagePath = path.join(moduleFolder, PACKAGE_JSON);
            if (!isFileSync(packagePath)) {
                continue;
            }
            const moduleName = path.relative(searchFolder, moduleFolder);
            const re_module = /^([^/\\]+|@[^/\\]+\/[^/\\]+)$/i;
            if (!re_module.test(moduleName)) {
                // Exclude things that aren't like 'modulename' or '@example/modulename'.
                continue;
            } else if (excludeDefinitelyTyped && re_definitelyTyped.test(moduleName)) {
                // Exclude Definitely Typed modules '@types/*'.
                continue;
            }
            let loadedModule: unknown;
            try {
                loadedModule = require(moduleName);
            } catch (err) {
                if (isErrorWithCode(err, ['MODULE_NOT_FOUND'])) {
                    continue;
                }
                throw err;
            }
            let accepted = true;
            if (filter) {
                accepted = filter(loadedModule, {
                    searchFolder,
                    packagePath,
                    moduleName,
                });
            }
            if (accepted) {
                modules[moduleName] = loadedModule;
            }
        }
    }
    return modules;
}
