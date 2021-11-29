const getEnvironmentBaseUrl = require('../../../../lib/getEnvironmentBaseUrl');
const messages = require('../../../../fixtures/messages.json');
const user = require('../../../../fixtures/users.json');
const statusCode = require('../../../../fixtures/statusCode.json');
const getKeyboardInfo = require('../../../../lib/getKeyboardInfos');
const getPasswordIds = require('../../../../lib/getPasswordIds');
const getKeyboardId = require('../requests/getkeyboardInfo.request');
const postLogin = require('../requests/postLogin.request');
const loginSchema = require('../contracts/login.contract');

describe('Login', () => {
  let idGenerated;
  let keysIdsGenerated;

  beforeAll(async () => {
    const baseUrl = getEnvironmentBaseUrl();
    const { id, keys } = await getKeyboardInfo(baseUrl.vxLogin);
    const keysIds = getPasswordIds(user.valid.password, keys);

    idGenerated = id;
    keysIdsGenerated = keysIds;
  });

  describe('Success', () => {
    it('should be able to return keyboard id and keys ids', async () => {
      const response = await getKeyboardId();

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).toHaveProperty('keys');
      expect(response.body).toHaveProperty('id');
    });

    it('should be able to login when passing valid credentials', async () => {
      const response = await postLogin(user.valid.document, user.valid.password);

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body.message).toBe(messages.loginSuccessfully);
      expect(response.body.result).toHaveProperty('token');
      expect(response.body.result).toHaveProperty('cryptoToken');
      expect(response.body.result).toHaveProperty('cryptoTokenV2');
    });
  });

  describe('Exception', () => {
    it('should not be able to login when does not passing invalid credentials', async () => {
      const response = await postLogin(user.invalid.document, user.invalid.password);

      expect(response.statusCode).toBe(statusCode.clientError.badRequest);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(messages.loginFailure);
    });
  });

  describe('Contract', () => {
    it(`should check login contract is correct`, async () => {
      const response = await postLogin(user.valid.document, user.valid.password);

      return loginSchema.validateAsync(response.body);
    });
  });
});
