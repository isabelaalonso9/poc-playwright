class PersonRepository {
  constructor(db) {
    this.collectionName = 'Person';
    this.db = db;
  }

  async deletePersonByDocument(document) {
    const response = await this.db
      .collection(this.collectionName)
      .deleteOne({ SocialNumber: document });
    return response;
  }
}

module.exports = PersonRepository;
