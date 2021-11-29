class AgentRepository {
  constructor(db) {
    this.collectionName = 'Agent';
    this.db = db;
  }

  async getUserInfoByDocument(document) {
    const response = await this.db.collection(this.collectionName).find({ Document: document });
    return response.toArray();
  }

  async deleteAgentByDocument(document) {
    const response = await this.db
      .collection(this.collectionName)
      .deleteOne({ Document: document });
    return response;
  }

  async expireAgentByDocument(document, status) {
    const yearsToSecond = 2 * 365 * 24 * 60 * 60;
    const response = await this.db.collection(this.collectionName).findOneAndUpdate(
      { Document: document },
      [
        {
          $set: {
            Status: status,
            RegisterDate: { $subtract: ['$RegisterDate', yearsToSecond * 1000] },
          },
        },
      ],
      { returnNewDocument: true }
    );
    return response;
  }
}

module.exports = AgentRepository;
