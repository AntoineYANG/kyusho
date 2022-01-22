/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 20:48:49 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-22 22:28:42
 */

const path = require('path');
const fs = require('fs');


const supported = /\.js$/;
const routerDir = path.join(__dirname, 'routers');

/**
 * @param {readonly ReturnType<import('express')>} app
 */
const useRouters = app => {
  fs.readdirSync(
    routerDir, {
      encoding: 'utf-8'
    }
  ).forEach(fn => {
    if (!supported.test(fn)) {
      return;
    }

    const file = path.join(routerDir, fn);
    
    /** @type {import('./typings/config.d').RouteConfig} */
    const config = require(file);

    if (!config.handler || typeof config.path !== 'string') {
      console.error(`[routers/${fn}] is not a valid route config.`);
      
      return;
    }

    switch (config.method ?? 'none') {
      case 'get': {
        app.get(config.path, config.handler);
        console.info(`OK - GET  [${config.path}]`);
        break;
      }
      case 'post': {
        app.post(config.path, config.handler);
        console.info(`OK - POST [${config.path}]`);
        break;
      }
      default: {
        console.error(`[routers/${fn}] is not a valid route config.`);
      }
    }
  });
};


module.exports = useRouters;
