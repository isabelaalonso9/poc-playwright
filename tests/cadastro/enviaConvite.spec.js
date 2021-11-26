const { test, expect } = require('@playwright/test');
const { PortalPage } = require('../pages/Portal');
const { seletores } = require('../utils/seletores');
const { EnvioConvitePage } = require('../pages/EnvioConvite');
const { geraEmailFake } = require('../utils/helpers');
const { cpf, cnpj } = require('cpf-cnpj-validator');
const credenciais = require('../fixtures/credenciais.json');
const personas = require('../fixtures/personas.json');

const email = geraEmailFake();

let cpfDocument;
let cnpjDocument;
let envioConvite;

test.describe('Envio de convite', () => {
  test.beforeEach(async ({ page }) => {
    const portal = new PortalPage(page);
    cpfDocument = cpf.generate();
    cnpjDocument = cnpj.generate();
    envioConvite = new EnvioConvitePage(page);

    await page.goto("https://portaluat.vortx.com.br/");
    await portal.login(credenciais.valida.cpf, credenciais.valida.senha);
    await page.locator(seletores.escolhaProdutos.bemVindoText).waitFor();
    await page.goto("https://vxcadastrouat.vortx.com.br/");
  })

  test('Deve ser possível enviar um convite para uma pessoa física', async ({ page }) => {
    await envioConvite.enviarConvite(cpfDocument, email, false)

    const result = page.locator(seletores.envioConvitePage.conviteSucessoText)
    await expect(result).toContainText('Seu convite foi enviado com sucesso!');
  })

  personas.forEach((persona) => {
    test(`Deve ser possível enviar um convite para um ${persona}`, async ({ page }) => {
      await envioConvite.enviarConvite(cnpjDocument, email, true, persona)

      const result = page.locator(seletores.envioConvitePage.conviteSucessoText)
      await expect(result).toContainText('Seu convite foi enviado com sucesso!');
    })
  })
})