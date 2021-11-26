const { test, expect } = require('@playwright/test');
const { PortalPage } = require('../pages/portal');
const { seletores } = require('../utils/seletores');
const { geraEmailFake } = require('../utils/helpers');
const { cpf, cnpj } = require('cpf-cnpj-validator');
const credenciais = require('../fixtures/credenciais.json');
const personas = require('../fixtures/personas.json');

let email;
let cpfDocument;
let cnpjDocument;

test.describe('Envio de convite', () => {
  test.beforeEach(async ({ page }) => {
    const portal = new PortalPage(page);
    email = geraEmailFake()
    cpfDocument = cpf.generate();
    cnpjDocument = cnpj.generate();

    await page.goto("https://portaluat.vortx.com.br/");
    await portal.login(credenciais.valida.cpf, credenciais.valida.senha);
    await page.locator(seletores.escolhaProdutos.bemVindoText).waitFor();
    await page.goto("https://vxcadastrouat.vortx.com.br/");
  })

  test('Deve ser possível enviar um convite para uma pessoa física', async ({ page }) => {
    await page.locator(seletores.sidebar.enviaConviteOpcao).waitFor()
    await page.click(seletores.sidebar.enviaConviteOpcao)
    await page.fill(seletores.envioConvitePage.documentoInput, cpfDocument)
    await page.fill(seletores.envioConvitePage.emailInput, email)
    await page.click(seletores.envioConvitePage.enviaConviteButton)
    await page.locator(seletores.envioConvitePage.conviteSucessoText).waitFor()

    const result = page.locator(seletores.envioConvitePage.conviteSucessoText)
    await expect(result).toContainText('Seu convite foi enviado com sucesso!');
  })

  personas.forEach((persona) => {
    test(`Deve ser possível enviar um convite para um ${persona}`, async ({ page }) => {
      await page.locator(seletores.sidebar.enviaConviteOpcao).waitFor()
      await page.click(seletores.sidebar.enviaConviteOpcao)
      await page.fill(seletores.envioConvitePage.documentoInput, cnpjDocument)
      await page.fill(seletores.envioConvitePage.emailInput, email)
      await page.selectOption(seletores.envioConvitePage.tipoPersonaInput, persona);
      await page.click(seletores.envioConvitePage.enviaConviteButton)
      await page.locator(seletores.envioConvitePage.conviteSucessoText).waitFor()

      const result = page.locator(seletores.envioConvitePage.conviteSucessoText)
      await expect(result).toContainText('Seu convite foi enviado com sucesso!');
    })
  })
})