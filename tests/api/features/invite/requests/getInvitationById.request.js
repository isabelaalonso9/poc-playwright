const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');

const getInvitationById = async (auth, invitationId) => {
  const baseUrl = getEnvironmentBaseUrl();

  const response = await request(baseUrl.vxCadastro)
    .get(`/invitation/invitation-by-id/${invitationId}`)
    .set('Authorization', auth);

  return response;
};

module.exports = getInvitationById;
