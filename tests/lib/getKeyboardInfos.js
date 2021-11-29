const request = require('supertest');

const getKeyboardInfos = async (url) => {
  const response = await request(url).get('/Login/Keyboard');
  return response.body;
};

module.exports = getKeyboardInfos;
