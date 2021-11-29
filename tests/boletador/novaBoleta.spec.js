const { chromium} = require('@playwright/test');
const { PortalPage } = require('../pages/Portal');

it('Cria boleta', async({ page })  => {

  await page.setViewportSize({ width: 1600, height: 1200 });

  const browser = await chromium.launch({
    headless:false
  });

  const loginPage = new PortalPage(page);

  loginPage.login('91808826094', '222333');

  await Promise.all([
      page.waitForNavigation(/*{ url: 'https://portaluat.vortx.com.br/productChoice' }*/),
      page.click('button:has-text("Entrar")')
  ]);

    // Navegação no productChoice e Vórtx One
    await Promise.all([
      page.waitForEvent('popup'),
      page.waitForNavigation(/*{ url: 'https://oneuat.vortx.com.br/' }*/),
      page.click('text=Vórtx One')
    ]);

    const vortxOne = browser.page.newPage();

  //Navegação no menu do Vórtx One
    await vortxOne.click('#botaoMenuFuncionalidades');
    await Promise.all([
      vortxOne.waitForNavigation(/*{ url: 'https://oneuat.vortx.com.br/boletador' }*/),
      vortxOne.click('li:has-text("Boletador")')
    ]);

    //Criando a boleta no Boletador
    await page.click('[aria-label="Abrir"]');
    await page.click('text=AMEIJOA FIM CP');
    await page.click('button:has-text("Avançar")');

    //Preenche dados da boleta
    await page.click('text=TipoTipo >> [aria-label="Abrir"]');
    await page.click('text=Instrução de Texto Livre (Exclusivo para operações não listadas)');
    await page.fill('input[name="mui-33588"]', 'hoje');
    await page.fill(':nth-match(input[name="mui-33588"], 2)', 'agendar');
    await page.click('label:has-text("Agendar para")');
    await page.click('[placeholder="Data"]');
    await page.click('[aria-label="Choose Tuesday, November 16th, 2021"]');
    await page.click('#TiposDeBoletas-Btn');
    await page.click('input[name="valorPagamento"]');
    await page.fill('input[name="valorPagamento"]', 'R$ 0,010');
    await page.click('textarea');
    await page.press('textarea', 'CapsLock');
    await page.fill('textarea', 'Teste com Playwright no Boletador');

    //Emite a boleta
    await page.click('button:has-text("Confirmar")');
    await expect(page).toHave('text=×Boleta emitida com sucesso');
});