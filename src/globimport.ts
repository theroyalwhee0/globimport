import glob from 'glob';

/** package.json constant */
export const PACKAGE_JSON = 'package.json';
/**
 * Glob Import options.
 */

export type GlobImportOptions = {
    excludeDefinitelyTyped: boolean; // Defaults to true.
    globOptions?: glob.IOptions;
};
/**
 * Additional data give to filter callback.
 */

export type GlobImportData = {
    searchFolder: string;
    packagePath: string;
    moduleName: string;
};
/**
 * Glob Import filter callback.
 */

export type GlobImportFilter = (module: unknown, data: GlobImportData) => boolean;

// Is Definitely Typed module?
// REF: https://github.com/DefinitelyTyped/DefinitelyTyped
export const re_definitelyTyped = /^@types\//;
