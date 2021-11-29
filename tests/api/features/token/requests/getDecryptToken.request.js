const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');

const getDecryptToken = async (auth) => {
  const baseUrl = getEnvironmentBaseUrl();
  const response = await request(baseUrl.vxLogin)
    .get('/User/GetDecryptTokenApi')
    .set('Authorization', auth);

  return response;
};

module.exports = getDecryptToken;
