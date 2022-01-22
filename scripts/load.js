/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 23:47:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 00:22:20
 */

const { execSync } = require('child_process');


const cli = '~/test/node_modules/espoir-cli/bin/index.js';

const main = () => {
  execSync(`node ${cli} run server.load`);
  execSync(`node ${cli} run homepage.load`);

  return 0;
};

process.exit(main());
