const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');

const getUserByDocument = async (auth, userDocument) => {
  const baseUrl = getEnvironmentBaseUrl();
  const response = await request(baseUrl.vxCadastro)
    .get(`/users/user-by-document/${userDocument}`)
    .set('Authorization', auth);

  return response;
};

module.exports = getUserByDocument;
