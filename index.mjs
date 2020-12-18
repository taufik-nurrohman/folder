import {copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, rmdirSync, statSync} from 'fs';
import {basename, dirname, extname, join, normalize} from 'path';

import {isFunction, isNumber, isSet, isString} from '@taufik-nurrohman/is';

const isStringEndsWith = (path, x) => {
    x = x.replace(/\s/g, "").replace(/[,]/g, '|');
    return (new RegExp('\\.(' + x + ')$', 'i')).test(path);
};

const trimEnds = path => {
    return path.replace(/[\\\/]+$/, "");
};

export const copy = (from, to, name) => {
    from = trimEnds(from);
    to = trimEnds(to) + '/' + (name || basename(from));
    let scans = getContent(from, null, true);
    if (null !== scans) {
        for (let scan in scans) {
            let end = scan.slice(from.length + 1);
            set(to + '/' + dirname(end), true);
            if (1 === scans[scan]) {
                copyFileSync(scan, to + '/' + end);
            } else {
                set(to + '/' + end, true);
            }
        }
    }
};

export const get = path => {
    return path && existsSync(path) ? normalize(path) : false;
};

export const getContent = (path, x = null, deep = 0) => {
    path = trimEnds(path);
    if (false === isFolder(path)) {
        return null;
    }
    let scans = readdirSync(path);
    let results = {};
    for (let scan in scans) {
        let scanIsFolder = false !== isFolder(scan = join(path, scans[scan]));
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

export const isFolder = path => {
    return get(path) && statSync(path).isDirectory() ? normalize(path) : false;
};

export const move = (from, to, name) => {
    from = trimEnds(from);
    to = trimEnds(to);
    if (!to) {
        rmSync(from, {
            recursive: true
        });
    } else {
        to += '/' + (name || basename(from));
        let scans = getContent(from, 1, true);
        if (null !== scans) {
            for (let scan in scans) {
                let end = scan.slice(from.length + 1);
                set(to + '/' + dirname(end), true);
                renameSync(scan, to + '/' + end);
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
    return "" !== value && '.' !== value && '/' !== value ? value : null;
};

export const set = (path, deep = false) => {
    mkdirSync(path, {
        recursive: deep
    });
};
