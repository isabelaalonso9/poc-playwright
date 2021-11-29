const request = require('supertest');
const getKeyboardInfo = require('./getKeyboardInfos');
const getPasswordIds = require('./getPasswordIds');
const user = require('../fixtures/users.json');
const getEnvironmentBaseUrl = require('./getEnvironmentBaseUrl');
const sendInvitePayload = require('../api/features/login/payloads/login.payload');

const getUserInfo = async () => {
  const baseUrl = getEnvironmentBaseUrl();
  const { id, keys } = await getKeyboardInfo(baseUrl.vxLogin);
  const keysIds = getPasswordIds(user.valid.password, keys);
  const payload = sendInvitePayload(id, keysIds, user.valid.document);
  const response = await request(baseUrl.vxLogin).post('/Login').send(payload);
  const token = `Basic ${response.body.result.cryptoTokenV2}`;
  const userId = response.body.result.id;
  const { name, email, document } = response.body.result;

  return {
    token,
    userId,
    name,
    email,
    document,
  };
};

module.exports = getUserInfo;
