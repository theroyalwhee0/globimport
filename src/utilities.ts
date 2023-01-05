import fs from 'node:fs';

/**
 * Is Error with match in code list.
 * @param err Value to check.
 * @param codes The codes to match.
 * @returns True if match, false if not.
 */
export function isErrorWithCode(err: unknown, codes: string[]): boolean {
    return err instanceof Error &&
        'code' in err &&
        typeof err.code === 'string' &&
        codes.includes(err.code);
}

/**
 * Is the file path a file? 
 * Traps missing-file errors as not a file.
 * @param filePath The path to check.
 * @returns True if file, false if not.
 */
export function isFileSync(filePath: string) {
    try {
        return fs.lstatSync(filePath).isFile();
    } catch (err) {
        if (isErrorWithCode(err, ['ENOENT', 'ENOTDIR'])) {
            return false;
        }
        throw err;
    }
}