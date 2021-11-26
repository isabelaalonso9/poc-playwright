const { seletores } = require('../utils/seletores');

class PortalPage {
  constructor(page) {
    this.page = page;
  }

  async login(documento, senha) {
    await this.page.fill(seletores.portal.documentoInput, documento);
    [...senha].forEach(async (digito) => {
      await this.page.click(seletores.portal.botaoTeclado(digito));
    });
    await this.page.click(seletores.portal.entrarButton);
  }
}

module.exports = { PortalPage };
