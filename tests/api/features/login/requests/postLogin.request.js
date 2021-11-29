const request = require('supertest');
const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');
const getKeyboardInfos = require('../../../../lib/getKeyboardInfos');
const getPasswordIds = require('../../../../lib/getPasswordIds');
const sendInvitePayload = require('../payloads/login.payload');

const postLogin = async (document, password) => {
  const baseUrl = getEnvironmentBaseUrl();
  const { id, keys } = await getKeyboardInfos(baseUrl.vxLogin);
  const keysIds = getPasswordIds(password, keys);
  const payload = sendInvitePayload(id, keysIds, document);
  const response = await request(baseUrl.vxLogin).post('/Login').send(payload);

  return response;
};

module.exports = postLogin;
