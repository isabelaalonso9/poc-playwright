const environmentsBaseUrl = require('../api/configs/environments');

const baseUrl = () => environmentsBaseUrl[process.env.LAUNCH_URL] || environmentsBaseUrl.local;

module.exports = baseUrl;
