const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');

const getInvitations = async (auth, inviteQuantity) => {
  const baseUrl = getEnvironmentBaseUrl();
  const queryParams = `skip=0&take=${inviteQuantity}&requireTotalCount=true`;

  const response = await request(baseUrl.vxCadastro)
    .get(`/invitation/latest-invitations?${queryParams}`)
    .set('Authorization', auth);

  return response;
};

module.exports = getInvitations;
