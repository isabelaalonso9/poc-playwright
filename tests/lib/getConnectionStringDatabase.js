const connectionStrings = require('../api/configs/connectionStrings');

const getConnectionStringDatabase = () =>
  connectionStrings[process.env.LAUNCH_URL] || connectionStrings.local;

module.exports = getConnectionStringDatabase;
