const faker = require('faker');
const documents = require('../../../../fixtures/documents.json');

const sendInviteWithRepresentative = () => ({
  check: true,
  email: faker.internet.email().toLowerCase(),
  isEscrow: false,
  isExternal: true,
  madeByRepresentative: false,
  reSendInvite: false,
  representative: {
    email: faker.internet.email().toLowerCase(),
    socialNumber: documents.representative.cpf,
  },
  socialNumber: documents.person,
  type: 'Pessoa Física',
});

module.exports = sendInviteWithRepresentative;
