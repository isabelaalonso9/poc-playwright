const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');
const sendInvitePayload = require('../payloads/sendInvite.payload');

const postInvite = async (auth, userId, personType, document) => {
  const baseUrl = getEnvironmentBaseUrl();
  const payload = sendInvitePayload(personType, document);

  const response = await request(baseUrl.vxCadastro)
    .post(`/invitation/send-invitation/${userId}`)
    .send(payload)
    .set('Authorization', auth);

  return response;
};

module.exports = postInvite;
