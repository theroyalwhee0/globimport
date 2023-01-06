import { expect } from 'chai';
import { describe, it } from 'mocha';
import { globImportSync } from '../src/sync';

describe('globImportSync', () => {
    it('should be a function', () => {
        expect(globImportSync).to.be.a('function');
        expect(globImportSync.length).to.equal(3);
    });
    it('should match a specific glob', () => {
        const modules = globImportSync('+(mocha|chai)');
        expect(modules).to.be.an('object');
        // Expect chai and mocha to be imported.
        const keys = Object.keys(modules);
        expect(keys).to.eql(['chai', 'mocha']);
        // Expect chai to be imported.
        const chaiModule = modules['chai'] as Chai.ChaiStatic;
        expect(chaiModule).to.be.an('object');
        expect(chaiModule.expect).to.be.a('function');
        // Expect mocha to be imported.
        const mochaModule = modules['mocha'] as Mocha;
        expect(mochaModule).to.be.a('function');
    });
    it('should match a not import Definitely Typed modules', () => {
        const modules = globImportSync('**/+(mocha|chai)');
        expect(modules).to.be.an('object');
        // Expect chai and mocha to be imported.
        const keys = Object.keys(modules);
        expect(keys).to.eql(['chai', 'mocha']);
        // Expect chai to be imported.
        const chaiModule = modules['chai'] as Chai.ChaiStatic;
        expect(chaiModule).to.be.an('object');
        expect(chaiModule.expect).to.be.a('function');
        // Expect mocha to be imported.
        const mochaModule = modules['mocha'] as Mocha;
        expect(mochaModule).to.be.a('function');
    });
    it('should match a grouping glob', () => {
        const modules = globImportSync('@typescript-eslint/*');
        expect(modules).to.be.an('object');
        const keys = Object.keys(modules);
        expect(keys).to.include('@typescript-eslint/utils');
    });
    it('should support excluding modules', () => {
        const modules = globImportSync('@typescript-eslint/*', undefined, {
            exclude: ['@typescript-eslint/utils'],
        });
        expect(modules).to.be.an('object');
        const keys = Object.keys(modules);
        expect(keys).to.not.include('@typescript-eslint/utils');
    });
    it('should match a glob with filter', () => {
        const modules = globImportSync('@typescript-eslint/*', (_) => {
            // Does module have 'ASTUtils'?
            return !!(_ && typeof _ === 'object' && 'ASTUtils' in _);
        });
        expect(modules).to.be.an('object');
        const keys = Object.keys(modules);
        expect(keys).to.eql(['@typescript-eslint/utils']);
    });
});
