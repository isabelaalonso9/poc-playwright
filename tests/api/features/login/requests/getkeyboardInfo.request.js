const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');

const getKeyboardId = async () => {
  const baseUrl = getEnvironmentBaseUrl();
  const response = await request(baseUrl.vxLogin).get('/Login/Keyboard');

  return response;
};

module.exports = getKeyboardId;
