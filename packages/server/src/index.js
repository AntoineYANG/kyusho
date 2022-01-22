/*
 * @Author: Kanata You 
 * @Date: 2022-01-22 20:45:52 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-23 00:33:19
 */

const express = require('express');
const bodyParser = require('body-parser');

const useRouters = require('./use-routers');


const PORT = 80;


const main = async () => {
  try {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(bodyParser.json());

    app.use(express.static('~/static'));

    useRouters(app);

    app.listen(PORT, () => {
      console.info(`App listening on port ${PORT}.`);
    });

    await new Promise(() => {});

    return 0;
  } catch (error) {
    console.error(`Error occurred when trying to start server:`, error);

    return 1;
  }
};


if (module === require.main) {
  main().then(process.exit);
}
