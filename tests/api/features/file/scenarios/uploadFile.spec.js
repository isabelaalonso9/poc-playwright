const { resolve } = require('path');
const getUserInfo = require('../../../../lib/getUserInfo');
const statusCode = require('../../../../fixtures/statusCode.json');
const postFile = require('../requests/postFile.request');
const messages = require('../../../../fixtures/messages.json');
const saveFileSchema = require('../contracts/saveFile.contract');

const supportedFile = resolve(__dirname, '..', '..', '..', '..', '..', 'doc', 'Teste.pdf');
const unsupportedFile = resolve(__dirname, '..', '..', '..', '..', '..', 'doc', 'Teste.js');
let tokenGenerated;

describe('Save File', () => {
  beforeAll(async () => {
    const { token } = await getUserInfo();

    tokenGenerated = token;
  });

  describe('Success', () => {
    it('should be able to save file', async () => {
      const response = await postFile(tokenGenerated, supportedFile);

      expect(response.statusCode).toBe(statusCode.success.created);
      expect(response.body).not.toBeNull();
    });
  });

  describe('Exception', () => {
    it('should not be able to save file when token is invalid', async () => {
      const response = await postFile(null, supportedFile);

      expect(response.statusCode).toBe(statusCode.clientError.unauthorized);
    });

    it('should not be able to save file when file does not exists', async () => {
      const response = await postFile(tokenGenerated);

      expect(response.statusCode).toBe(statusCode.serverError.internalServerError);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(messages.fileNonexistent);
    });

    it('should not be able to save file when file extension is unsupported', async () => {
      const response = await postFile(tokenGenerated, unsupportedFile);

      expect(response.statusCode).toBe(statusCode.serverError.internalServerError);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe(messages.unsupportedMediaType);
    });
  });

  describe('Contract', () => {
    it('should check if saveFile contract is correct', async () => {
      const response = await postFile(tokenGenerated, supportedFile);

      return saveFileSchema.validateAsync(response.body);
    });
  });
});
