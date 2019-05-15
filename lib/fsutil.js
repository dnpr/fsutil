'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Check if input path is a directory.
 * @param {string} path - The input path.
 * @returns {boolean}
 */
function isDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}

/**
 * Check if input path is a file.
 * @param {string} path - The input path.
 * @returns {boolean}
 */
function isFile(path) {
  return fs.lstatSync(path).isFile();
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
        .filter(isDirectory)
        .filter(name => re.test(name))
        .map((name) => path.join(absoluteDir, name));
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
        .filter(isFile)
        .filter(name => re.test(name))
        .map((name) => path.join(absoluteDir, name));
    }
  }

  /**
   * Get status of a path.
   * @param {string} path - The path.
   * @returns {Promise<fs.Stats>}
   */
  this.getFileStat = async function (path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
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
