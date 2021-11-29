const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');
const sendInviteWithRepresentative = require('../payloads/sendInviteWithRepresentative.payload');

const postInviteWithRepresentative = async (auth, userId) => {
  const baseUrl = getEnvironmentBaseUrl();
  const payload = sendInviteWithRepresentative();

  const response = await request(baseUrl.vxCadastro)
    .post(`/invitation/send-invitation/${userId}`)
    .send(payload)
    .set('Authorization', auth);

  return response;
};

module.exports = postInviteWithRepresentative;
