const statusCode = require('../../../../fixtures/statusCode.json');
const getDecryptToken = require('../requests/getDecryptToken.request');
const getUserInfo = require('../../../../lib/getUserInfo');
const decryptTokenSchema = require('../contracts/decryptToken.contract');
const messages = require('../../../../fixtures/messages.json');

let userName;
let userEmail;
let tokenGenerated;

describe('TokenApi', () => {
  beforeAll(async () => {
    const { token, userId, name, email } = await getUserInfo();

    userName = name;
    userEmail = email;
    tokenGenerated = token;
  });

  describe('Success', () => {
    it('should be able to get decryptToken', async () => {
      const response = await getDecryptToken(tokenGenerated);

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body.email).toBe(userEmail);
      expect(response.body.given_name).toBe(userName);
    });
  });

  describe('Exception', () => {
    it('should not be able to get decryptToken when token is null', async () => {
      const response = await getDecryptToken(null);

      expect(response.statusCode).toBe(statusCode.serverError.internalServerError);
      expect(response.body.Message).toBe(messages.getDecryptTokenFailure);
    });
  });

  describe('Contract', () => {
    it(`should check getDecryptToken contract is correct`, async () => {
      const response = await getDecryptToken(tokenGenerated);

      return decryptTokenSchema.validateAsync(response.body);
    });
  });
});
