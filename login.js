const {chromium} = require('playwright');

(async() => {

    const browser = await chromium.launch({
        headless:false
    });

    const page = await browser.newPage();
    await page.goto("https://portaluat.vortx.com.br/");

    // Click [placeholder="Informe seu CPF"]
    await page.click('[placeholder="Informe seu CPF"]');

    // Fill [placeholder="Informe seu CPF"]
    await page.fill('[placeholder="Informe seu CPF"]', '487.864.858-90');

    //Teclado seguro
    
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://portaluat.vortx.com.br/productChoice' }*/),
        page.click('button:has-text("Entrar")')
    ]);

    await expect(page.locator('text=A senha deve conter 6 caracteres')).toHaveText('A senha deve conter 6 caracteres');

    await browser.close();
    
})();

(async() => {

    const browser = await chromium.launch({
        headless:false
    });

    const page = await browser.newPage();
    await page.goto("https://portaluat.vortx.com.br/");

    // Click [placeholder="Informe seu CPF"]
    await page.click('[placeholder="Informe seu CPF"]');

    // Fill [placeholder="Informe seu CPF"]
    await page.fill('[placeholder="Informe seu CPF"]', '487.864.858-90');
    await page.fill('[placeholder="Informe seu CPF"]', '487.864.858-90');
    
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://portaluat.vortx.com.br/productChoice' }*/),
        page.click('button:has-text("Entrar")')
    ]);

    await browser.close();
    
})();