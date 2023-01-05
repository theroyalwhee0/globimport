"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileSync = exports.isErrorWithCode = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
/**
 * Is Error with match in code list.
 * @param err Value to check.
 * @param codes The codes to match.
 * @returns True if match, false if not.
 */
function isErrorWithCode(err, codes) {
    return err instanceof Error &&
        'code' in err &&
        typeof err.code === 'string' &&
        codes.includes(err.code);
}
exports.isErrorWithCode = isErrorWithCode;
/**
 * Is the file path a file?
 * Traps missing-file errors as not a file.
 * @param filePath The path to check.
 * @returns True if file, false if not.
 */
function isFileSync(filePath) {
    try {
        return node_fs_1.default.lstatSync(filePath).isFile();
    }
    catch (err) {
        if (isErrorWithCode(err, ['ENOENT', 'ENOTDIR'])) {
            return false;
        }
        throw err;
    }
}
exports.isFileSync = isFileSync;
//# sourceMappingURL=utilities.js.map