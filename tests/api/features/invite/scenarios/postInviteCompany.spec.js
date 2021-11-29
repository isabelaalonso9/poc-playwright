const getUserInfo = require('../../../../lib/getUserInfo');
const getConnectionStringDatabase = require('../../../../lib/getConnectionStringDatabase');
const postInvite = require('../requests/postInvite.request');
const inviteSchema = require('../contracts/invite.contract');
const statusCode = require('../../../../fixtures/statusCode.json');
const DatabaseConnection = require('../../../../../repositories/DatabaseConnection');
const documents = require('../../../../fixtures/documents.json');
const companiesTypes = require('../../../../fixtures/companiesTypes.json');
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

describe('Send Invite Company', () => {
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
    const document = documents.company.replace(/\W/g, '');
    await deleteRegisterInDatabase(document, connectionDb);
  });

  describe('Success', () => {
    companiesTypes.forEach((company) => {
      it(`should be able to send invite to ${company}`, async () => {
        const response = await postInvite(
          tokenGenerated,
          userIdGenerated,
          company,
          documents.company
        );

        expect(response.statusCode).toBe(statusCode.success.ok);
        expect(response.body).not.toBeNull();
      });
    });
  });

  describe('Exception', () => {
    companiesTypes.forEach((company) => {
      it('should not be able to send duplicate invitations', async () => {
        await postInvite(tokenGenerated, userIdGenerated, company, documents.company);
        const response = await postInvite(
          tokenGenerated,
          userIdGenerated,
          company,
          documents.company
        );

        expect(response.statusCode).toBe(statusCode.clientError.badRequest);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe(messages.inviteExists);
      });
    });
  });

  describe('Contract', () => {
    companiesTypes.forEach((company) => {
      it(`should check if ${company} contract is correct`, async () => {
        const response = await postInvite(
          tokenGenerated,
          userIdGenerated,
          company,
          documents.company
        );

        return inviteSchema.validateAsync(response.body);
      });
    });
  });
});
