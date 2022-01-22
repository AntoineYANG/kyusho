/*
 * @Author: Kanata You 
 * @Date: 2022-01-23 00:18:52 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 00:31:55
 */

const fs = require('fs');
const { execSync } = require('child_process');
const { sync: mkdirp } = require('mkdirp');


const target = '~/apps/homepage';

const headFile = `${target}/head`;

const incoming = `~/repos/kyusho/packages/homepage/package.json`;


const main = async () => {
  const curId = fs.existsSync(headFile) ? parseInt(fs.readFileSync(
    headFile, {
      encoding: 'utf-8'
    }
  ).split('\n')[0]) : 0;

  const nextId = require(incoming).buildId ?? 0;

  if (nextId > curId) {
    mkdirp(`~/apps/homepage/${nextId}`);

    fs.readdirSync('~/repos/kyusho/packages/homepage/build').forEach(fn => {
      if (fn === 'static' || fn === '.git') {
        return;
      }

      const p = `~/repos/kyusho/packages/homepage/build/${fn}`;
      execSync(`cp ${p} ~/apps/homepage/${nextId}/${p} -r`);
    });

    fs.readdirSync('~/repos/kyusho/packages/homepage/build/static').forEach(fn => {
      const p = `~/repos/kyusho/packages/homepage/build/static/${fn}`;
      
      if (fs.existsSync(p)) {
        fs.rmSync(p, {
          recursive: true,
          force: true
        });
      }
      
      execSync(`cp ${p} ~/static/${nextId}/${p} -r`);
    });

    fs.writeFileSync(headFile, `${nextId}`, {
      encoding: 'utf-8'
    });
  }

  return 0;
};


main().then(process.exit);
