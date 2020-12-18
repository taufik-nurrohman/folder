Folder
======

Utility functions of native folder system API in Node.js. Not to be used in the browser.

Usage
-----

### CommonJS

~~~ js
const {getContent} = require('@taufik-nurrohman/folder');

console.log(getContent('./node_modules', 1, true));
~~~

### ECMAScript

~~~ js
import {getContent} = from '@taufik-nurrohman/folder';

console.log(getContent('./node_modules', 1, true));
~~~

Methods
-------

### copy(from, to, name)

Copy a folder with its contents.

~~~ .js
copy('./node_modules', './foo/bar/baz');
copy('./node_modules', './foo/bar/baz', 'node_modules.bak');
~~~

### get(path)

Check if file/folder does exist.

~~~ .js
if (false !== get('./node_modules')) {
    // …
}
~~~

### getContent(path, x = null, deep = 0)

List all files and folders in a folder as object.

~~~ .js
// List file(s) only
console.log(getContent('./node_modules', 1));

// List folder(s) only
console.log(getContent('./node_modules', 0));

// List file(s) only with extension `.js`
console.log(getContent('./node_modules', 'js'));

// List file(s) only with extension `.js` and `.mjs`
console.log(getContent('./node_modules', 'js,mjs'));

// List file(s) only with extension `.js` and `.mjs` recursively
console.log(getContent('./node_modules', 'js,mjs', true));
~~~

### isFolder(path)

Check if path is a folder.

~~~ .js
if (isFolder('./foo/bar/baz')) {
    // …
}
~~~

### move(from, to, name)

Delete or move a folder with its contents.

~~~ .js
// Delete
move('./node_modules', false);

// Delete
move('./node_modules');

// Move
move('./node_modules', './foo/bar/baz');

// Move with a custom name
move('./node_modules', './foo/bar/baz', 'node_modules.bak');
~~~

### name(path)

Get folder name from folder path.

~~~ .js
console.log(name('./foo/bar/baz'));
console.log(name('./foo/bar/baz.qux'));
~~~

### parent(path)

Get parent path from folder path.

~~~ .js
console.log(parent('./foo/bar/baz'));
console.log(parent('./'));
console.log(parent('.'));
console.log(parent(""));
~~~

### set(path, deep = false)

Create an empty folder if it does not exist.

~~~ .js
set('./foo/bar/baz', true);
~~~
