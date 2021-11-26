const geraEmailFake = () => {
  const prefix = Math.random().toString(36).substring(7);
  const email = `test_${prefix}@vortx.com.br`;

  return email;
};

module.exports = { geraEmailFake }