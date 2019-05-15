'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const fsUtil = require('../lib');

function isEmptyArray(arr) {
  assert.strictEqual(typeof arr, 'object', 'Expected type to be object');
  assert.strictEqual(arr.length, 0, 'Expected length to be 0');
}

describe('fsutil.getDirectories', () => {
  it('should return directories inside input path', function (done) {
    let dirs = fsUtil.getDirectories(path.join(__dirname, '..'));
    for (let i = 0; i < dirs.length; i += 1) {
      const isDir = fs.lstatSync(dirs[i]).isDirectory();
      assert.strictEqual(isDir, true, 'Expected path to be a folder');
    }
    done();
  })
  it(`should return an empty array when input is empty`, function (done) {
    let dirs = fsUtil.getDirectories();
    isEmptyArray(dirs);
    done();
  })
  it(`should return an empty array when input path does not exist`, function (done) {
    let dirs = fsUtil.getDirectories('./nonexist');
    isEmptyArray(dirs);
    done();
  })
  it(`should return an empty array when input path is a file`, function (done) {
    let dirs = fsUtil.getDirectories(path.join(__dirname, '../package.json'));
    isEmptyArray(dirs);
    done();
  })
});

describe('fsutil.getFiles', () => {
  it('should return files inside input path', function (done) {
    let dirs = fsUtil.getFiles(path.join(__dirname, '..'));
    for (let i = 0; i < dirs.length; i += 1) {
      const isFile = fs.lstatSync(dirs[i]).isFile();
      assert.strictEqual(isFile, true, 'Expected path to be a file');
    }
    done();
  })
  it(`should return an empty array when input is empty`, function (done) {
    let files = fsUtil.getFiles();
    isEmptyArray(files);
    done();
  })
  it(`should return an empty array when input path does not exist`, function (done) {
    let files = fsUtil.getFiles('./nonexist');
    isEmptyArray(files);
    done();
  })
  it(`should return an empty array when input path is a file`, function (done) {
    let files = fsUtil.getFiles(path.join(__dirname, '../package.json'));
    isEmptyArray(files);
    done();
  })
});

describe('fsutil.getFileStat', () => {
  it('should return status of input path', async function () {
    let file = path.join(__dirname, '../package.json');
    let stats = await fsUtil.getFileStat(file);
    let answer = fs.statSync(file);
    let keys = Object.keys(answer);
    return new Promise((resolve, reject) => {
      for (let i = 0; i < keys.length; ++i) {
        let key = keys[i];
        if (!stats.hasOwnProperty(key)) reject(new Error(`Property ${key} is not defined.`));
      }
      resolve();
    });
  })
});