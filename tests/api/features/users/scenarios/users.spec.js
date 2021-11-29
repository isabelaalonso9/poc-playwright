const statusCode = require('../../../../fixtures/statusCode.json');
const getUserByEmail = require('../requests/getUserByEmail.request');
const getUserInfo = require('../../../../lib/getUserInfo');
const userByEmailSchema = require('../contracts/userByEmail.contract');
const getUserByDocument = require('../requests/getUserByDocument.request');

let userEmail;
let userDocument;
let tokenGenerated;
let userIdGenerated;

describe('Users', () => {
  beforeAll(async () => {
    const { token, userId, email, document } = await getUserInfo();

    userEmail = email;
    userDocument = document;
    tokenGenerated = token;
    userIdGenerated = userId;
  });

  describe('Success', () => {
    it('should be able to get user by email when email exists', async () => {
      const response = await getUserByEmail(tokenGenerated, userEmail);

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).toHaveProperty('user');
      expect(response.body).not.toBeNull();
    });

    it('should not be able to get user by email when email does not exists', async () => {
      const response = await getUserByEmail(tokenGenerated, 'invalid_email');

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).toMatchObject({});
    });

    it('should not be able to get user by document when document does not exists', async () => {
      const response = await getUserByDocument(tokenGenerated, 'invalid_document');

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).toMatchObject({});
    });
  });

  describe('Exception', () => {
    it('should not be able to get user by email when token is invalid or does not exists', async () => {
      const response = await getUserByEmail(null, 'any_email');

      expect(response.statusCode).toBe(statusCode.clientError.unauthorized);
    });
  });

  describe('Contract', () => {
    it('should check userByEmail contract is correct', async () => {
      const response = await getUserByEmail(tokenGenerated, userEmail);

      return userByEmailSchema.validateAsync(response.body);
    });
  });
});
