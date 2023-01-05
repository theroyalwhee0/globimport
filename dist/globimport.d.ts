import glob from 'glob';
/** package.json constant */
export declare const PACKAGE_JSON = "package.json";
/**
 * Glob Import options.
 */
export type GlobImportOptions = {
    excludeDefinitelyTyped: boolean;
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
export declare const re_definitelyTyped: RegExp;
