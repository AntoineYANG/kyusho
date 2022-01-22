/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 23:56:11 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 00:29:05
 */

const fs = require('fs');
const { execSync } = require('child_process');
const { sync: mkdirp } = require('mkdirp');


const target = '~/apps/server';

const headFile = `${target}/head`;

const incoming = `~/repos/kyusho/packages/server/package.json`;


const main = async () => {
  const curId = fs.existsSync(headFile) ? parseInt(fs.readFileSync(
    headFile, {
      encoding: 'utf-8'
    }
  ).split('\n')[0]) : 0;

  const nextId = require(incoming).buildId ?? 0;

  if (nextId > curId) {
    mkdirp(`~/apps/server/${nextId}`);

    fs.readdirSync('~/repos/kyusho/packages/server/src').forEach(fn => {
      if (fn === '.git') {
        return;
      }

      const p = `~/repos/kyusho/packages/server/src/${fn}`;
      execSync(`cp ${p} ~/apps/server/${nextId}/${p} -r`);
    });

    fs.writeFileSync(headFile, `${nextId}`, {
      encoding: 'utf-8'
    });
  }

  return 0;
};


main().then(process.exit);
