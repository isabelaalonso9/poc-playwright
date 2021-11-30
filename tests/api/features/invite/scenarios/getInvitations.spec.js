const getInvitations = require('../requests/getInvitations.request');
const generateRandomNumber = require('../../../../lib/generateRandomNumber');
const getUserInfo = require('../../../../lib/getUserInfo');
const statusCode = require('../../../../fixtures/statusCode.json');
const lastInvitationsSchema = require('../contracts/lastInvitations.contract');
const invitationByIdSchema = require('../contracts/invitationById.contract');
const postInvite = require('../requests/postInvite.request');
const getInvitationById = require('../requests/getInvitationById.request');
const documents = require('../../../../fixtures/documents.json');
const deleteRegisterInDatabase = require('../../../../lib/deleteRegisterInDatabase');
const DatabaseConnection = require('../../../../../repositories/DatabaseConnection');
const getConnectionStringDatabase = require('../../../../lib/getConnectionStringDatabase');

let connectionClient;
let connectionDb;
let tokenGenerated;
let userIdGenerated;

DatabaseConnection.setConfig({
  url: getConnectionStringDatabase().vxCadastro,
  databaseName: 'VxCadastro',
});

describe('Get Invitations', () => {
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
    const document = documents.other.replace(/\W/g, '');
    await deleteRegisterInDatabase(document, connectionDb);
  });

  describe('Success', () => {
    it('should be able to get invitations', async () => {
      const quantityInvite = generateRandomNumber(100);
      const response = await getInvitations(tokenGenerated, quantityInvite);
      const { records } = response.body;

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).not.toBeNull();
      expect(response.body).toHaveProperty('count');
      expect(response.body).toHaveProperty('records');
      expect(records).toHaveLength(quantityInvite);
    });

    it('should be able to get invitation by id', async () => {
      const inviteResponse = await postInvite(
        tokenGenerated,
        userIdGenerated,
        'Pessoa Física',
        documents.other
      );
      const { id } = inviteResponse.body.invitation;
      const response = await getInvitationById(tokenGenerated, id);

      expect(response.statusCode).toBe(statusCode.success.ok);
      expect(response.body).not.toBeNull();
    });
  });

  describe('Exception', () => {
    it('should not be able to get invitations when passing invalid token', async () => {
      const response = await getInvitations('invalid_token', 0);

      expect(response.statusCode).toBe(statusCode.clientError.unauthorized);
      expect(response.body).toMatchObject({});
    });

    it('should not be able to get invitations when does not pass a token', async () => {
      const response = await getInvitations(null, 0);

      expect(response.statusCode).toBe(statusCode.clientError.unauthorized);
      expect(response.body).toMatchObject({});
    });
  });

  describe('Contract', () => {
    it('should check if lastInvitation contract is correct', async () => {
      const quantityInvite = generateRandomNumber(100);
      const response = await getInvitations(tokenGenerated, quantityInvite);

      return lastInvitationsSchema.validateAsync(response.body);
    });

    it('should check if getInvitationById contract is correct', async () => {
      const inviteResponse = await postInvite(
        tokenGenerated,
        userIdGenerated,
        'Pessoa Física',
        documents.other
      );
      const { id } = inviteResponse.body.invitation;
      const response = await getInvitationById(tokenGenerated, id);

      return invitationByIdSchema.validateAsync(response.body);
    });
  });
});
