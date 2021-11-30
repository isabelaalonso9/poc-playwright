const { seletores } = require('../utils/seletores');

class EnvioConvitePage {
  constructor(page) {
    this.page = page;
  }

  async enviarConvite(document, email, isCompany, persona) {
    await this.page.locator(seletores.sidebar.enviaConviteOpcao).waitFor()
    await this.page.click(seletores.sidebar.enviaConviteOpcao)
    await this.page.fill(seletores.envioConvitePage.documentoInput, document)
    await this.page.fill(seletores.envioConvitePage.emailInput, email)

    if (isCompany) {
      await this.page.selectOption(seletores.envioConvitePage.tipoPersonaInput, persona);
    }

    await this.page.click(seletores.envioConvitePage.enviaConviteButton)
    await this.page.locator(seletores.envioConvitePage.conviteSucessoText).waitFor()
  }
}

module.exports = { EnvioConvitePage }