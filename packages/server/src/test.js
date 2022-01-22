const fs = require('fs');
const needle = require('needle');


needle.post('localhost:80/deploy', {
  data: {
    name: 'packages\\server\\src\\test.js',
    raw: fs.readFileSync('D:\\project\\@github-KANATA\\kyusho\\packages\\server\\src\\test.js')
  },
  admin: 'root',
  pwd: '123456'
}).on('done', err => {
  if (err) {
    console.error('err', err);
  } else {
    console.log('done');
  }
});
