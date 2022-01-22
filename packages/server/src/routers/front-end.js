/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 21:05:05 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 00:27:22
 */

const fs = require('fs/promises');
const path = require('path');

const logger = require('../utils/logger');


const headFile = `/root/apps/homepage/head`;

let curId = parseInt(fs.readFileSync(
  headFile, {
    encoding: 'utf-8'
  }
).split('\n')[0]);

let lastCheck = Date.now();

const checkInterval = 1000 * 10;

const getResourcePath = p => {
  const time = Date.now();

  if (time >= lastCheck + checkInterval) {
    lastCheck = time;

    curId = parseInt(fs.readFileSync(
      headFile, {
        encoding: 'utf-8'
      }
    ).split('\n')[0]);
  }

  return path.join('/root/apps/homepage', curId, p);
};

/** @type {import('../typings/config.d').RouteConfig} */
const config = {
  path: '/',
  method: 'get',
  handler: (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    fs.readFile(
      getResourcePath('index.html'), {
        encoding: 'utf-8'
      }
    ).then(data => {
      res.end(data);
    }).catch(err => {
      logger.reportError(err, {
        method: req.method,
        url: req.url,
        params: req.params,
        cookies: req.cookies
      });
    });
  }
};


module.exports = config;
