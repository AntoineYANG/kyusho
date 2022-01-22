/*
 * @Author: Kanata You 
 * @Date: 2022-01-23 00:18:52 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 01:12:14
 */

const fs = require('fs');
const { execSync } = require('child_process');
const { sync: mkdirp } = require('mkdirp');


const target = '/root/apps/homepage';

const headFile = `${target}/head`;

const incoming = `/root/repos/kyusho/packages/homepage/package.json`;


const main = async () => {
  const curId = fs.existsSync(headFile) ? parseInt(fs.readFileSync(
    headFile, {
      encoding: 'utf-8'
    }
  ).split('\n')[0]) : 0;

  const nextId = require(incoming).buildId ?? 0;

  if (nextId > curId) {
    mkdirp(`/root/apps/homepage/${nextId}`);

    fs.readdirSync('/root/repos/kyusho/packages/homepage/build').forEach(fn => {
      if (fn === 'static' || fn === '.git') {
        return;
      }

      const p = `/root/repos/kyusho/packages/homepage/build/${fn}`;
      execSync(`cp ${p} /root/apps/homepage/${nextId}/${fn} -r`);
    });

    fs.readdirSync('/root/repos/kyusho/packages/homepage/build/static').forEach(fn => {
      const p = `/root/repos/kyusho/packages/homepage/build/static/${fn}`;
      const t = `/root/static/${fn}`;
      
      if (fs.existsSync(t)) {
        fs.rmSync(t, {
          recursive: true,
          force: true
        });
      }
      
      execSync(`cp ${p} ${t} -r`);
    });

    fs.writeFileSync(headFile, `${nextId}`, {
      encoding: 'utf-8'
    });
  }

  return 0;
};


main().then(process.exit);
