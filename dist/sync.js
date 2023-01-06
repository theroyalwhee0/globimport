"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globImportSync = void 0;
const node_path_1 = __importDefault(require("node:path"));
const glob_1 = __importDefault(require("glob"));
const utilities_1 = require("./utilities");
const globimport_1 = require("./globimport");
/**
 * Import modules matching glob, optionally filtering.
 * By default Definitely Typed modules are excluded.
 * @param pattern The glob pattern to use.
 * @param filter The filter callback to use. Optional.
 * @param options The options for the import. Optional.
 * @returns An object with module names as key and the imported module as the value.
 */
function globImportSync(pattern, filter, options) {
    const globOptions = options?.globOptions ?? {};
    const excludeDefinitelyTyped = options?.excludeDefinitelyTyped ?? true;
    const excludeModules = options?.exclude ?? [];
    const modules = {};
    const nodePath = process?.env?.NODE_PATH ?? '';
    const pathPaths = nodePath.split(node_path_1.default.delimiter);
    const requirePaths = require.main?.paths ?? [];
    const searchPaths = [].concat(requirePaths, pathPaths)
        .filter(_ => !!_);
    for (const searchFolder of searchPaths) {
        const matches = glob_1.default.sync(pattern, {
            cwd: searchFolder,
            ...globOptions,
        });
        for (const matchName of matches) {
            const moduleFolder = node_path_1.default.join(searchFolder, matchName);
            const packagePath = node_path_1.default.join(moduleFolder, globimport_1.PACKAGE_JSON);
            if (!(0, utilities_1.isFileSync)(packagePath)) {
                continue;
            }
            const moduleName = node_path_1.default.relative(searchFolder, moduleFolder);
            const re_module = /^([^/\\]+|@[^/\\]+\/[^/\\]+)$/i;
            if (
            // Exclude things that aren't like 'modulename' or '@example/modulename'.
            (!re_module.test(moduleName)) ||
                // Exclude Definitely Typed modules '@types/*'.
                (excludeDefinitelyTyped && globimport_1.re_definitelyTyped.test(moduleName)) ||
                // Exclude anything in the exclude list.
                (excludeModules.includes(moduleName))) {
                continue;
            }
            let loadedModule;
            try {
                loadedModule = require(moduleName);
            }
            catch (err) {
                if ((0, utilities_1.isErrorWithCode)(err, ['MODULE_NOT_FOUND'])) {
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
exports.globImportSync = globImportSync;
//# sourceMappingURL=sync.js.map