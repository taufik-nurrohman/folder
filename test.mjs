import ava from 'ava';
import * as f from './index.mjs';

ava.todo('copy');

ava('get', t => {
    t.is(f.get('./node_modules'), 'node_modules');
    t.is(f.get('./asdf'), false);
});

ava.todo('getContent');

ava('isFolder', t => {
    t.is(f.isFolder('./node_modules'), 'node_modules');
    t.is(f.isFolder('./package.json'), false);
});

ava.todo('move');

ava('name', t => {
    t.is(f.name('./foo/bar/baz'), 'baz');
    t.is(f.name('./foo/bar/baz.qux'), 'baz.qux');
});

ava('parent', t => {
    t.is(f.parent('./foo/bar/baz'), 'foo/bar');
    t.is(f.parent('./'), null);
    t.is(f.parent('.'), null);
    t.is(f.parent(""), null);
});

ava.todo('set');
