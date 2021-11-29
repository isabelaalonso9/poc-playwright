const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');

const getUserByEmail = async (auth, userEmail) => {
  const baseUrl = getEnvironmentBaseUrl();
  const response = await request(baseUrl.vxCadastro)
    .get(`/users/email/${userEmail}`)
    .set('Authorization', auth);

  return response;
};

module.exports = getUserByEmail;
