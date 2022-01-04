const { resolve, parse } = require('path');

const PROJECT_PATH = resolve(__dirname, '../'),
  PROJECT_NAME = parse(PROJECT_PATH).name;

const isDev = process.env.NODE_ENV !== 'production',
  isProd = process.env.NODE_ENV === 'production';
const SERVER_PATH = '127.0.0.1',
  SERVER_PORT = 8088;

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_PORT,
  SERVER_PATH,
  isDev,
  isProd,
};
