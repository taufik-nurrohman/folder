const {copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, rmdirSync, statSync} = require('fs');
const {basename, dirname, extname, join, normalize} = require('path');

const {isFunction, isNumber, isSet, isString} = require('@taufik-nurrohman/is');

const isStringEndsWith = (path, x) => {
    x = x.replace(/\s/g, "").replace(/[,]/g, '|');
    return (new RegExp('\\.(' + x + ')$', 'i')).test(path);
};

const trimEnds = path => {
    return path.replace(/[\\\/]+$/, "");
};

const copy = (from, to, name) => {
    from = trimEnds(from);
    to = trimEnds(to) + '/' + (name || basename(from));
    let scans = getContent(from, null, true);
    for (let scan in scans) {
        let end = scan.slice(from.length + 1);
        set(to + '/' + dirname(end), true);
        if (1 === scans[scan]) {
            copyFileSync(scan, to + '/' + end);
        } else {
            set(to + '/' + end, true);
        }
    }
};

const get = path => {
    return path && existsSync(path) ? normalize(path) : false;
};

const getContent = (path, x = null, deep = 0) => {
    path = trimEnds(path);
    let scans = readdirSync(path);
    let results = {};
    for (let scan in scans) {
        let scanIsFolder = isFolder(scan = join(path, scans[scan]));
        if (scanIsFolder) {
            if (!isSet(x) || 0 === x || false === x) {
                results[scan] = 0;
            }
        } else {
            if (!isSet(x) || 1 === x || true === x || isString(x) && isStringEndsWith(scan, x)) {
                results[scan] = 1;
            }
        }
        if (deep && scanIsFolder) {
            if (isNumber(deep)) {
                let scans = getContent(scan, x, true);
                let j = path.length + 1;
                for (let scan in scans) {
                    let i = scan.slice(j).split(/[\\\/]/).length;
                    if (i > j) {
                        continue;
                    }
                    results[scan] = scans[scan];
                }
            } else {
                Object.assign(results, getContent(scan, x, deep));
            }
        }
    }
    return results;
};

const isFolder = path => {
    return statSync(path).isDirectory() ? normalize(path) : false;
};

const move = (from, to, name) => {
    from = trimEnds(from);
    to = trimEnds(to) + '/' + (name || basename(from));
    let scans = getContent(from, 1, true);
    for (let scan in scans) {
        let end = scan.slice(from.length + 1);
        set(to + '/' + dirname(end), true);
        renameSync(scan, to + '/' + end);
    }
    rmSync(from, {
        recursive: true
    });
};

const name = path => {
    let value = basename(path);
    return "" !== value ? value : null;
};

const parent = path => {
    let value = dirname(normalize(path));
    return "" !== value && '.' !== value && '/' !== value ? value : null;
};

const set = (path, deep = false) => {
    mkdirSync(path, {
        recursive: deep
    });
};

Object.assign(exports || {}, {
    copy,
    get,
    getContent,
    isFolder,
    move,
    name,
    parent,
    set
});
