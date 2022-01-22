/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 23:56:11 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 01:02:01
 */

const fs = require('fs');
const { execSync } = require('child_process');
const { sync: mkdirp } = require('mkdirp');


const target = '/root/apps/server';

const headFile = `${target}/head`;

const incoming = `/root/repos/kyusho/packages/server/package.json`;


const main = async () => {
  const curId = fs.existsSync(headFile) ? parseInt(fs.readFileSync(
    headFile, {
      encoding: 'utf-8'
    }
  ).split('\n')[0]) : 0;

  const nextId = require(incoming).buildId ?? 0;

  if (nextId > curId) {
    mkdirp(`/root/apps/server/${nextId}`);

    fs.readdirSync('/root/repos/kyusho/packages/server/src').forEach(fn => {
      if (fn === '.git') {
        return;
      }

      const p = `/root/repos/kyusho/packages/server/src/${fn}`;
      execSync(`cp ${p} /root/apps/server/${nextId}/${fn} -r`);
    });

    fs.writeFileSync(headFile, `${nextId}`, {
      encoding: 'utf-8'
    });
  }

  return 0;
};


main().then(process.exit);
