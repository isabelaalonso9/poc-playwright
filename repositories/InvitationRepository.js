class InvitationRepository {
  constructor(db) {
    this.collectionName = 'Invitation';
    this.db = db;
  }

  async getRowsOnHash(inviteHash) {
    const response = await this.db.collection(this.collectionName).find({ Hash: inviteHash });
    const rows = response.toArray();
    return rows;
  }

  async getInviteByDocument(document) {
    const response = await this.db.collection(this.collectionName).find({ SocialNumber: document });
    return response.toArray();
  }

  async deleteInviteByDocument(document) {
    const response = await this.db
      .collection(this.collectionName)
      .deleteOne({ SocialNumber: document });
    return response;
  }

  async expiredInviteByDocument(document) {
    const daysToSecond = 31 * 24 * 60 * 60;
    const response = await this.db.collection(this.collectionName).findOneAndUpdate(
      { SocialNumber: document },
      [
        {
          $set: {
            ExpirationDate: { $subtract: ['$ExpirationDate', daysToSecond * 1000] },
          },
        },
      ],
      { returnNewDocument: true }
    );
    return response;
  }
}

module.exports = InvitationRepository;
