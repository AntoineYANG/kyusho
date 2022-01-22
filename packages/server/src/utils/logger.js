/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 21:31:22 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-22 21:58:21
 */

const fs = require('fs');


/**
 * @param {Error} err
 * @param {Object} data
 */
const reportError = (err, data) => {
  const now = new Date();
  const output = `~/logs/errors/${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.log`;
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
