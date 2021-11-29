const faker = require('faker');

const sendInvitePayload = (type, document) => ({
  check: true,
  email: faker.internet.email().toLowerCase(),
  isEscrow: false,
  isExternal: true,
  madeByRepresentative: false,
  reSendInvite: false,
  representative: {
    email: '',
    socialNumber: '',
  },
  socialNumber: document,
  type,
});

module.exports = sendInvitePayload;
