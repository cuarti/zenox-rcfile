
import {ok, deepEqual} from 'assert';
import {join} from 'path';
import load from '..';


describe('load', () => {

    process.chdir(__dirname);

    const EXPECTED_DATA = {
        NAME: 'rcfile',
        VERSION: '1',
        WORKS: 'true'
    };

    it('is function', () => {
        ok(load instanceof Function);
    });

    it('absolute path', done => {
        load(join(__dirname, '.examplerc')).then(data => {
            deepEqual(data, EXPECTED_DATA);
            done();
        }).catch(done);
    });

    it('project root path', done => {
        load('test/.examplerc').then(data => {
            deepEqual(data, EXPECTED_DATA);
            done();
        }).catch(done);
    });

    it('current working path', done => {
        load('.examplerc').then(data => {
            deepEqual(data, EXPECTED_DATA);
            done();
        }).catch(done);
    });

    it('nonexistent path', done => {
        load('test/file').then(() => {
            ok(false);
            done();
        }).catch(err => done(!err));
    });

});
