const getUserInfo = require('../../../../lib/getUserInfo');
const getConnectionStringDatabase = require('../../../../lib/getConnectionStringDatabase');
const postInvite = require('../requests/postInvite.request');
const postInviteWithRepresentative = require('../requests/postInviteWithRepresentative.request');
const inviteSchema = require('../contracts/invite.contract');
const statusCode = require('../../../../fixtures/statusCode.json');
const DatabaseConnection = require('../../../../../repositories/DatabaseConnection');
const documents = require('../../../../fixtures/documents.json');
const deleteRegisterInDatabase = require('../../../../lib/deleteRegisterInDatabase');
const messages = require('../../../../fixtures/messages.json');

let connectionClient;
let connectionDb;
let tokenGenerated;
let userIdGenerated;

DatabaseConnection.setConfig({
  url: getConnectionStringDatabase().vxCadastro,
  databaseName: 'VxCadastro',
});

describe('Send Invite Person', () => {
  beforeAll(async () => {
    const { token, userId } = await getUserInfo();
    const { client, db } = await DatabaseConnection.connect();

    connectionClient = client;
    connectionDb = db;
    tokenGenerated = token;
    userIdGenerated = userId;
  });

  afterAll(async () => {
    connectionClient.close();
  });

  afterEach(async () => {
    const document = documents.person.replace(/\W/g, '');
    await deleteRegisterInDatabase(document, connectionDb);
  });

  describe('Success', () => {
    it(`should be able to send invite to fisical Person`, async () => {
      const response = await postInvite(
        tokenGenerated,
        userIdGenerated,
        'Pessoa Física',
        documents.person
      );
      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).not.toBeNull();
    });

    it('should be able to send invite with representative', async () => {
      const response = await postInviteWithRepresentative(tokenGenerated, userIdGenerated);

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).not.toBeNull();
    });
  });

  describe('Exception', () => {
    it('should not be able to send duplicate invitations', async () => {
      await postInvite(tokenGenerated, userIdGenerated, 'Pessoa Física', documents.person);
      const response = await postInvite(
        tokenGenerated,
        userIdGenerated,
        'Pessoa Física',
        documents.person
      );

      expect(response.statusCode).toBe(statusCode.clientError.badRequest);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(messages.inviteExists);
    });
  });

  describe('Contract', () => {
    it('should check if invite person with representative contract is correct', async () => {
      const response = await postInviteWithRepresentative(tokenGenerated, userIdGenerated);

      return inviteSchema.validateAsync(response.body);
    });

    it('should check if invite person contract is correct', async () => {
      const response = await postInvite(tokenGenerated, userIdGenerated, 'Pessoa Física');

      return inviteSchema.validateAsync(response.body);
    });
  });
});
