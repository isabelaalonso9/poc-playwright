const {chromium} = require('@playwright/test');
const credenciais = require('../fixtures/credenciais.json');
const { PortalPage } = require('../pages/Portal');

(async() => {

    const browser = await chromium.launch({
      headless:false
    });

    const page = await browser.newPage();

    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto("https://portaluat.vortx.com.br/");

    const portal = new PortalPage(page);

    await portal.login(credenciais.valida.cpf, credenciais.valida.senha);

    await Promise.all([
      page.waitForEvent('popup'),
      page.waitForNavigation(/*{ url: 'https://one.vortx.com.br/' }*/),
      page.click('text=Vórtx One Habilitado >> small'),
      page.click('#botaoMenuFuncionalidades'),
    ]);
})();
