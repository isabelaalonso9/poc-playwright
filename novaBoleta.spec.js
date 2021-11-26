const {test, chromium} = require('@playwright/test');
const { logaPortalPage } = require('./portal');

test('Entra no Portal e clica no Vórtx One', async({ page })  => {

  await page.setViewportSize({ width: 1600, height: 1200 });

//  const browser = await chromium.launch({
//    headless:false
//  });

  const loginPage = new logaPortalPage(page);

  loginPage.login('48786485890', '881952');

  await Promise.all([
      page.waitForNavigation(/*{ url: 'https://portaluat.vortx.com.br/productChoice' }*/),
      page.click('button:has-text("Entrar")')
  ]);

    // Click text=Vórtx One Habilitado >> small
  const [page1] = await Promise.all([
      page.waitForEvent('popup'),
      page.waitForNavigation(/*{ url: 'https://one.vortx.com.br/' }*/),
      page.click('text=Vórtx One Habilitado >> small')
    ]);
    // Click #botaoMenuFuncionalidades
    await page1.click('#botaoMenuFuncionalidades');
    // Click li:has-text("Boletador")
    await Promise.all([
      page1.waitForNavigation(/*{ url: 'https://one.vortx.com.br/boletador' }*/),
      page1.click('li:has-text("Boletador")')
    ]);
    // Click [aria-label="Abrir"]
    await page1.click('[aria-label="Abrir"]');

    //Criando a boleta no Boletador
    await page1.click('#cnpj-do-fundo');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Enter');
    await page1.click('button:has-text("Avançar")');

    //Preenche dados da boleta
    await page1.click('text=TipoTipo >> [aria-label="Abrir"]');
    await page1.click('text=Instrução de Texto Livre (Exclusivo para operações não listadas)');
    await page1.fill('input[name="mui-33588"]', 'hoje');
    await page1.fill(':nth-match(input[name="mui-33588"], 2)', 'agendar');
    await page1.click('label:has-text("Agendar para")');
    await page1.click('[placeholder="Data"]');
    await page1.click('[aria-label="Choose Tuesday, November 16th, 2021"]');
    await page1.click('#TiposDeBoletas-Btn');
    await page1.click('input[name="valorPagamento"]');
    await page1.fill('input[name="valorPagamento"]', 'R$ 0,010');
    await page1.click('textarea');
    await page1.press('textarea', 'CapsLock');
    await page1.fill('textarea', 'Teste com Playwright no Boletador');

    //Emite a boleta
    await page1.click('button:has-text("Confirmar")');
    await expect(page1).toHave('text=×Boleta emitida com sucesso');
});