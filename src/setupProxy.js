// eslint-disable-next-line import/no-extraneous-dependencies
const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy(['/api/**', '/websocket/**', '/socket.io/**', '/static/upload/**'], {
      target: 'http://0.0.0.0:5000',
      ws: true,
    }),
  );
};
