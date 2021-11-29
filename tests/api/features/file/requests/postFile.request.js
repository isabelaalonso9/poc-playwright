const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');

const postFile = async (auth, file) => {
  const baseUrl = getEnvironmentBaseUrl();

  const response = await request(baseUrl.vxCadastro)
    .post('/upload/save-investor-document')
    .set('Authorization', auth)
    .attach('file', file);

  return response;
};

module.exports = postFile;
