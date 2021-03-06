/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 21:44:14 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 00:39:55
 */

const fs = require('fs');
const { execSync } = require('child_process');

const logger = require('../utils/logger');


const admins = {};

fs.readFileSync(
  '/root/configs/admin', {
    encoding: 'utf-8'
  }
).split('\n').forEach(line => {
  const d = line.trim();

  if (/^.*:.*$/.test(d)) {
    const { name, pwd } = /^(?<name>.*):(?<pwd>.*)$/.exec(d).groups;

    admins[name] = pwd;
  }
});


/** @type {import('../typings/config.d').RouteConfig} */
const config = {
  path: '/deploy',
  method: 'post',
  handler: (req, res) => {
    /** @type {import('../typings/deploy.d').DeployBody} */
    const body = req.body;
    
    if (['admin', 'pwd'].find(k => !Boolean(body[k]))) {
      return res.status(400).json({
        reason: 'Bad request body'
      });
    }

    if (admins[body.admin] !== body.pwd) {
      return res.status(403).json({
        reason: 'Forbidden'
      });
    }

    try {
      execSync(`git pull origin main`, {
        cwd: '/root/repos/kyusho'
      });

      execSync(`node /root/repos/kyusho/scripts/load.js`, {
        cwd: '/root/repos/kyusho'
      });
    } catch (error) {
      logger.reportError(error, {
        app: body.app
      });

      return res.status(500).json({
        reason: 'Error occurred'
      });
    }
    
    return res.status(200).json({
      msg: 'ok'
    });
  }
};


module.exports = config;

