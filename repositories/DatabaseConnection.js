const { MongoClient } = require('mongodb');

class DatabaseConnection {
  constructor() {
    this.config = {
      url: 'not informed',
      databaseName: 'not informed',
    };
  }

  setConfig(config) {
    this.config = config;
  }

  async connect() {
    const client = await MongoClient(this.config.url, { useUnifiedTopology: true }).connect();
    const db = await client.db(this.config.databaseName);

    return { client, db };
  }
}

module.exports = new DatabaseConnection();
