const { expect } = require('@playwright/test');
const { PortalPage } = require('../pages/Portal');
const { seletores } = require('../seletores');
const { EnvioConvitePage } = require('../pages/EnvioConvite');
const { geraEmailFake } = require('../../lib/generateRandomEmail');
const { cpf, cnpj } = require('cpf-cnpj-validator');
const credenciais = require('../../fixtures/users.json');
const personas = require('../../fixtures/companiesTypes.json');

let cpfDocument;
let cnpjDocument;
let envioConvite;
let email;

describe('Envio de convite', () => {
  beforeAll(async () => {
    const portal = new PortalPage(page);
    envioConvite = new EnvioConvitePage(page);

    await page.goto("https://portaluat.vortx.com.br/");
    await portal.login(credenciais.valid.document, credenciais.valid.password);
    await page.locator(seletores.escolhaProdutos.bemVindoText).waitFor();
    await page.goto("https://vxcadastrouat.vortx.com.br/");
  })

  beforeEach(async () => {
    cpfDocument = cpf.generate();
    cnpjDocument = cnpj.generate();
    email = geraEmailFake();
    await page.goto("https://vxcadastrouat.vortx.com.br/");
  })

  it('Deve ser possível enviar um convite para uma pessoa física', async () => {
    await envioConvite.enviarConvite(cpfDocument, email, false)

    const result = page.locator(seletores.envioConvitePage.conviteSucessoText)
    await expect(result).toContainText('Seu convite foi enviado com sucesso!');
  })

  personas.forEach((persona) => {
    it(`Deve ser possível enviar um convite para um ${persona}`, async () => {
      await envioConvite.enviarConvite(cnpjDocument, email, true, persona)

      const result = page.locator(seletores.envioConvitePage.conviteSucessoText)
      await expect(result).toContainText('Seu convite foi enviado com sucesso!');
    })
  })
})