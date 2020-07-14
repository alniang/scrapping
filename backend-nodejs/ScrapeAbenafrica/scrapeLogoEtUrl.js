const puppeteer = require('puppeteer');
const fs = require('fs');

(async()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://abenafrica.com/afro-agenda/");

    //****************** Récupération des titres **************************//
    const titres = await page.evaluate(() => 
        Array.from(document.querySelectorAll('h4.mec-event-title a'))
        .map(titre => ({titre : titre.innerText.trim()}))
    )
    //****************** Fin de la récupération des titres **************************//

    //****************** Récupération des logos **************************//
    // Etape 1 : récup brut des liens
    const logos = await page.evaluate(() => 
        Array.from(document.querySelectorAll('article'))
        .map((logo) => (logo).getAttribute('style'))
    )
    // Etape 2 : traitement des liens brut pour avoir les liens des logos 
    const str = logos;
    const images = []
    for(i = 0 ; i < str.length ; i++){
        const words = str[i].split(' ');
        const logo = words[1]
        var lien =null
        if(logo != undefined){
            lien = logo.substring(5,logo.length-2)
        }
        images.push({logo : lien})
    }
    //****************** Fin de la récupération des logos **************************//

    //****************** Récupération des Lieux **************************//
    const lieux = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.mec-event-detail'))
        .map(lieu => ({lieu : lieu.textContent}))
    )

    //****************** Fin de la récupération des Lieux **************************//

    //****************** Récupération des url **************************//
    const urls = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.mec-event-title a'))
        .map(link => ({url : link.href}))
    )
    console.log(urls)
    //****************** Fin de la récupération des url **************************//

    /*console.log(titres)
    console.log(images)
    console.log(lieux)
    console.log(urls)*/

    let data_url = JSON.stringify(urls, null, 2);
    fs.writeFileSync('../json/abenafrica/abenafrica-urls.json', data_url);
    fs.writeFileSync('../../configMongoDB/dataset/abenafrica-urls.json', data_url)
    
    let data_logo = JSON.stringify(images, null, 2);
    fs.writeFileSync('../json/abenafrica/abenafrica-logos.json', data_logo);
    fs.writeFileSync('../../configMongoDB/dataset/abenafrica-logos.json', data_logo)
    console.log("********** Scrapping fini ***********")
    await browser.close();
})();