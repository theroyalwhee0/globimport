/**
 * Is Error with match in code list.
 * @param err Value to check.
 * @param codes The codes to match.
 * @returns True if match, false if not.
 */
export declare function isErrorWithCode(err: unknown, codes: string[]): boolean;
/**
 * Is the file path a file?
 * Traps missing-file errors as not a file.
 * @param filePath The path to check.
 * @returns True if file, false if not.
 */
export declare function isFileSync(filePath: string): boolean;
