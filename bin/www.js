const app = require('../app');
const config = require('../app/config/environment');


app.listen(config.port, () => {
  config.logger.log(`API server listening on ${config.host}:${config.port}, in ${config.env}`);
});
