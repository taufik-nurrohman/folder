import test from 'ava';
import * as f from './index.mjs';

test.todo('copy');

test('get', t => {
    t.is(f.get('./node_modules'), 'node_modules');
    t.is(f.get('./asdf'), false);
});

test.todo('getContent');

test('isFolder', t => {
    t.is(f.isFolder('./node_modules'), 'node_modules');
    t.is(f.isFolder('./package.json'), false);
});

test.todo('move');

test('name', t => {
    t.is(f.name('./foo/bar/baz'), 'baz');
    t.is(f.name('./foo/bar/baz.qux'), 'baz.qux');
});

test('parent', t => {
    t.is(f.parent('./foo/bar/baz'), 'foo/bar');
    t.is(f.parent('./'), null);
    t.is(f.parent('.'), null);
    t.is(f.parent(""), null);
});

test.todo('set');
