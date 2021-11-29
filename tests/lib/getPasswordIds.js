const getDigitId = (digit, keys) => {
  let keyId;

  keys.forEach((keyInfo) => {
    if (keyInfo.value.includes(digit)) keyId = keyInfo.id;
  });

  return keyId;
};

const getPasswordIds = (password, keys) => {
  const keysIds = [];

  [...password].forEach((digit) => {
    const keyId = getDigitId(digit, keys);
    keysIds.push(keyId);
  });

  return keysIds;
};

module.exports = getPasswordIds;
