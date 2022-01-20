const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const Mock = require('mockjs');
const mocks = require('../router/index');

console.log(mocks);

const mockDir = path.join(process.cwd(), 'mock');
// process.env.NODE_ENV

const registerRoutes = (app) => {
  let mockLastIndex;
  const mocksForServer = mocks.map(({ url, type, response }) => {
    console.log(url);
    return {
      url: new RegExp(`/${process.env.NODE_ENV}${url}`),
      type: type || 'get',
      response(req, res) {
        console.log(`request invoke:${req.path}`);
        res.json(Mock.mock(response instanceof Function ? response(req, res) : response));
      },
    };
  });
  console.log(mocksForServer);
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response); // 添加路由
    mockLastIndex = app._router.stack.length;
  }
  console.log(app._router.stack);
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
};

const unregisterRoutes = () => {
  for (const key of Object.keys(require.cache)) {
    if (key.includes(mockDir)) {
      delete require.cache[require.resolve(key)];
    }
  }
};

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  let { mockRoutesLength, mockStartIndex } = registerRoutes(app);
  chokidar
    .watch(mockDir, {
      ignored: /server/,
      ignoreInitial: true,
    })
    .on('all', (event, modifyPath) => {
      if (event === 'change' || event === 'add') {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength);
          unregisterRoutes();
          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          console.log(chalk.megentaBright(`\n > Mock Server hot reload success! changed  ${modifyPath}`));
        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });
};
