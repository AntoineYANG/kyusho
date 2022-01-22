/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 21:31:22 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-22 23:47:23
 */

const fs = require('fs');
const { sync: mkdirp } = require('mkdirp');


/**
 * @param {Error} err
 * @param {Object} data
 */
const reportError = (err, data) => {
  const now = new Date();
  
  if (!fs.existsSync(`/root/logs/errors`)) {
    mkdirp(`/root/logs/errors`);
  }

  const output = `/root/logs/errors/${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.log`;
  const info = `[${now.toISOString()}]\n${JSON.stringify(
    {
      ...data,
      error: `${err}`
    },
    undefined,
    2
  )}\n\n`;

  fs.appendFileSync(output, info, {
    encoding: 'utf-8'
  });
};


module.exports = {
  reportError
};
