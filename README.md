# GlobImport - @theroyalwhee0/globimport

## What is this?
A library to import modules in Node.js using glob syntax.

This library does not support ESModules.


## Typescript
When using globimport with Typescript the imported modules are of type unknown.


## Installation
`npm install @theroyalwhee0/globimport`  


## Usage
`globImportSync(<glob>, [filter], [options])`

- `glob` is [glob](https://www.npmjs.com/package/glob) string that is used to match paths in node_modules.
- `filter` is a filter function that is called for each imported module. If the filter returns `true` then the module is kept, otherwise it is dropped.
- `options`
    - `exclude` - A list of modules to exclude from the glob by name.
    - `excludeDefinitelyTyped` - Exclude Definitely Typed modules ('@types/*'). Defaults to true.
    - `globOptions` - Options passed directy to 'glob'.

Also see `examples/` and `test/`.


## Examples
```ts
import { globImportSync } from '@theroyalwhee0/globimport';

const modules = globImportSync('**/goose-*');
const moduleCount = Object.keys(modules).length;
console.info(`[INFO ] Matched ${moduleCount} Modules:`, ...Object.keys(modules));
```

## Testing.
Running ```npm run test``` will run the test suite. Running ```npm run test-watch``` will run the test suite in watch mode.


## Links
- GitHub: [https://github.com/theroyalwhee0/globimport](https://github.com/theroyalwhee0/globimport)
- NPM: [https://www.npmjs.com/package/@theroyalwhee0/globimport](https://www.npmjs.com/package/@theroyalwhee0/globimport)
- Changelog: [https://github.com/theroyalwhee0/globimport/blob/main/changelog.md](https://github.com/theroyalwhee0/globimport/blob/main/changelog.md)


## Legal & License
Copyright 2023 Adam Mill

This library is released under Apache 2 license. See [LICENSE](https://github.com/theroyalwhee0/globimport/blob/main/LICENSE) for more details.
