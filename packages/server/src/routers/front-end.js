/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 21:05:05 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-22 21:58:35
 */

const fs = require('fs/promises');

const logger = require('../utils/logger');


/** @type {import('../typings/config.d').RouteConfig} */
const config = {
  path: '/',
  method: 'get',
  handler: (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    fs.readFile(
      '~/apps/homepage/index.html', {
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
