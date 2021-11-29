class CompanyRepository {
  constructor(db) {
    this.collectionName = 'Company';
    this.db = db;
  }

  async deleteCompanyByDocument(document) {
    const response = await this.db
      .collection(this.collectionName)
      .deleteOne({ SocialNumber: document });
    return response;
  }
}

module.exports = CompanyRepository;
