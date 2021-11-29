const loginPayload = (keyboardId, keysIds, document) => ({
  Document: document,
  KeyboardId: keyboardId,
  Password: keysIds,
});

module.exports = loginPayload;
