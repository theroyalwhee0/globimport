import { GlobImportFilter, GlobImportOptions } from './globimport';
/**
 * Import modules matching glob, optionally filtering.
 * By default Definitely Typed modules are excluded.
 * @param pattern The glob pattern to use.
 * @param filter The filter callback to use. Optional.
 * @param options The options for the import. Optional.
 * @returns An object with module names as key and the imported module as the value.
 */
export declare function globImportSync(pattern: string, filter?: GlobImportFilter, options?: GlobImportOptions): Record<string, unknown>;
