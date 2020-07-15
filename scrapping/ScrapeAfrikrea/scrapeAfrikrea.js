const puppeteer = require('puppeteer');
const fs = require('fs');

(async()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.afrikrea.com/fr/categories/clothing");

    //****************** Récupération des url **************************//
    const urls = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.card div.content div.title a'))
        .map(url => ({ url : url.href}))
    )

    //****************** Fin de la récupération des url **************************//

    //****************** Récupération des logos **************************//
    const logos = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.card div.bg-cover picture img'))
        .map(logo => ({logo : logo.src}))

    )
    //****************** Fin de la récupération des logos **************************//

    //****************** Récupération des titres **************************//
    const titres = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.card div.content div.title a'))
        .map(titre => ({titre : titre.innerText}))
    )
    //****************** Fin de la récupération des titres **************************//

    //****************** Récupération des prix **************************//
    const prix = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.content div.description span.price-tag '))
        .map(prix => ({prix : prix.innerText}))
    )
    //****************** Fin de la récupération des prix **************************//

    let data_url = JSON.stringify(urls, null, 2);
    fs.writeFileSync('../json/afrikrea/afrikrea-urls.json', data_url);
    // fs.writeFileSync('../../configMongoDB/dataset/afrikrea-urls.json', data_url);

    let data_logo = JSON.stringify(logos, null, 2);
    fs.writeFileSync('../json/afrikrea/afrikrea-logos.json', data_logo);
    // fs.writeFileSync('../../configMongoDB/dataset/afrikrea-logos.json', data_logo);

    let data_titre = JSON.stringify(titres, null, 2);
    fs.writeFileSync('../json/afrikrea/afrikrea-titres.json', data_titre);
    // fs.writeFileSync('../../configMongoDB/dataset/afrikrea-titres.json', data_titre);

    let data_prix = JSON.stringify(prix, null, 2);
    fs.writeFileSync('../json/afrikrea/afrikrea-prix.json', data_prix);
    // fs.writeFileSync('../../configMongoDB/dataset/afrikrea-prix.json', data_prix);

    await browser.close();
})();
