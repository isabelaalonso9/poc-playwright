const { cnpj } = require('cpf-cnpj-validator');
const InvitationRepository = require('../../repositories/InvitationRepository');
const AgentRepository = require('../../repositories/AgentRepository');
const PersonRepository = require('../../repositories/PersonRepository');
const CompanyRepository = require('../../repositories/CompanyRepository');

const deleteRegisterInDatabase = async (document, db) => {
  let deleteInvestorRegister;
  const isCNPJ = cnpj.isValid(document);

  const deleteAgentRegister = new AgentRepository(db).deleteAgentByDocument(document);
  const deleteInvitationRegister = new InvitationRepository(db).deleteInviteByDocument(document);
  if (isCNPJ) deleteInvestorRegister = new CompanyRepository(db).deleteCompanyByDocument(document);
  else deleteInvestorRegister = new PersonRepository(db).deletePersonByDocument(document);

  await Promise.all([deleteInvitationRegister, deleteInvestorRegister, deleteAgentRegister]);
};

module.exports = deleteRegisterInDatabase;
