class logaPortalPage {

  constructor(page) {
    this.page = page;
  }

  async login(documento, senha) {

    await this.page.goto("https://portaluat.vortx.com.br/");

    await this.page.fill('[placeholder="Informe seu CPF"]', documento);

    [...senha].forEach(async (number) => {
        const botaoTeclado = `//button[contains(text(), "${number}")][contains(@class, "btnKeyboars")]`;
        await this.page.click(botaoTeclado);
    });

    await this.page.click('button:has-text("Entrar")')
  }
}

module.exports = { logaPortalPage };
