'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Check if input path is a directory.
 * @param {string} _path - The input path.
 * @returns {boolean}
 */
function isDirectory(_path) {
  return fs.lstatSync(_path).isDirectory();
}

/**
 * Check if input path is a file.
 * @param {string} _path - The input path.
 * @returns {boolean}
 */
function isFile(_path) {
  return fs.lstatSync(_path).isFile();
}

function fsutil(opts) {

  /**
   * Get directory names in a directory.
   * @param {string} dir - A directory.
   * @param {RegExp} re - A regular expression object.
   * @returns {string[]} An array of directory names.
   */
  this.getDirectories = function (dir, re = new RegExp(`^[^]`)) {
    if (typeof dir === 'undefined' || !fs.existsSync(dir) || isFile(dir)) {
      return [];
    } else {
      const absoluteDir = path.resolve(dir);
      return fs.readdirSync(absoluteDir)
        .map((name) => path.join(absoluteDir, name))
        .filter(isDirectory)
        .filter(name => re.test(name));
    }
  }

  /**
   * Get file names in a directory.
   * @param {string} dir - A directory.
   * @param {RegExp} re - A regular expression object.
   * @returns {string[]} An array of file names.
   */
  this.getFiles = function (dir, re = new RegExp(`^[^]`)) {
    if (typeof dir === 'undefined' || !fs.existsSync(dir) || isFile(dir)) {
      return [];
    } else {
      const absoluteDir = path.resolve(dir);
      return fs.readdirSync(absoluteDir)
        .map((name) => path.join(absoluteDir, name))
        .filter(isFile)
        .filter(name => re.test(name));
    }
  }

  /**
   * Get status of a path.
   * @param {string} _path - The path.
   * @returns {Promise<fs.Stats>}
   */
  this.getFileStat = async function (_path) {
    return new Promise((resolve, reject) => {
      fs.stat(_path, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve(stats);
        }
      });
    });
  }

}

module.exports = fsutil;
