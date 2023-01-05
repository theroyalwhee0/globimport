import { globImportSync } from '../dist/index'; // @theroyalwhee0/globimport

const modules = globImportSync('**/goose-*');
const moduleCount = Object.keys(modules).length;
console.info(`[INFO ] Matched ${moduleCount} Modules:`, ...Object.keys(modules));
