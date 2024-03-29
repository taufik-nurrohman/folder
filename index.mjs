import {copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, rmdirSync, statSync} from 'fs';
import {basename, dirname, extname, join, normalize, resolve} from 'path';

import {isFunction, isNumber, isSet, isString} from '@taufik-nurrohman/is';

const hasExtension = (path, x) => {
    x = x.replace(/\s/g, "").replace(/[,]/g, '|');
    return (new RegExp('\\.(' + x + ')$', 'i')).test(path);
};

export const copy = (from, to, name) => {
    from = resolve(from);
    to = resolve(join(to, name || basename(from)));
    let scans = getContent(from, null, true);
    if (null !== scans) {
        for (let scan in scans) {
            let end = scan.slice(from.length + 1);
            set(join(to, dirname(end)), true);
            if (1 === scans[scan]) {
                copyFileSync(scan, join(to, end));
            } else {
                set(join(to, end), true);
            }
        }
    }
};

export const get = path => {
    return path && existsSync(path) ? resolve(normalize(path)) : false;
};

export const getContent = (path, x = null, deep = 0) => {
    if (false === isFolder(path = resolve(path))) {
        return null;
    }
    let f = isFunction(x),
        scans = readdirSync(path);
    let results = {};
    for (let scan in scans) {
        let scanIsFolder = false !== isFolder(scan = join(path, scans[scan]));
        if (scanIsFolder) {
            if (!isSet(x) || 0 === x || false === x || f && x(0, scan)) {
                results[scan] = 0;
            }
        } else {
            if (!isSet(x) || 1 === x || true === x || isString(x) && hasExtension(scan, x) || f && x(1, scan)) {
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

export const isFolder = path => {
    return (path = get(path)) && statSync(path).isDirectory() ? path : false;
};

export const move = (from, to, name) => {
    from = resolve(from);
    if (!to) {
        rmSync(from, {
            recursive: true
        });
    } else {
        to = resolve(to);
        to = join(to, name || basename(from));
        let scans = getContent(from, 1, true);
        if (null !== scans) {
            for (let scan in scans) {
                let end = scan.slice(from.length + 1);
                set(join(to, dirname(end)), true);
                renameSync(scan, join(to, end));
            }
            rmSync(from, {
                recursive: true
            });
        }
    }
};

export const name = path => {
    let value = basename(path);
    return "" !== value ? value : null;
};

export const parent = path => {
    let value = dirname(normalize(path));
    return "" !== value && '.' !== value && '/' !== value ? resolve(value) : null;
};

export const set = (path, deep = false) => {
    mkdirSync(path, {
        recursive: deep
    });
};