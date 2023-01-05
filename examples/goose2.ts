import { globImportSync } from '../dist/index'; // @theroyalwhee0/globimport

type GooseModule = {
    ipsum?: string,
    lorem?: string,
    isGoose: boolean,
}

export type GooseRecord = Record<string, GooseModule>

const {
    ['goose-ipsum']: gooseIpsum,
    ['@example/goose-lorem']: gooseLorem,
} = globImportSync('**/goose-*') as GooseRecord;
console.info('[INFO ] Goose Ipsum:', gooseIpsum.lorem ?? '-', gooseIpsum.ipsum ?? '-');
console.info('[INFO ] Goose Lorem:', gooseLorem.lorem ?? '-', gooseLorem.ipsum ?? '-');
