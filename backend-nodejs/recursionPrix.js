const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {

    // Extract partners on the page, recursively check the next page in the URL partner
    // const extractPartners = async url => {
    //     const page = await browser.newPage();
    //     await page.goto(url);
    //     console.log(`scraping : ${url}`);

    //     // Scrape the data we want
    //     const partnersOnPage = await page.evaluate(() =>
    //         // Array.from(document.querySelectorAll("div.compact")).map(compact => ({
    //         //     title : compact.querySelector("h3.title").innerText.trim(),
    //         //     logo : compact.querySelector(".logo img").src
    //         // }))

    //         Array.from(document.querySelectorAll('div.card div.content div.title a'))
    //         .map(url => ({ url : url.href}))
    //     );
    //     await page.close();

    //     // Should we end recursion?
    //     if (partnersOnPage.length < 1){
    //         // Terminate if no partners exist
    //         console.log(`terminate recursion on: ${url}`)
    //         return partnersOnPage
    //     }else{
    //         // Go fletch the next page ? page = X + 1
    //         // What is the next url?
    //         const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
    //         const nextUrl = `https://www.afrikrea.com/fr/categories/clothing?
    //         page=${nextPageNumber}`;
    //         return partnersOnPage.concat(await extractPartners(nextUrl))
    //     }
    // };


    // Extract partners on the page, recursively check the next page in the URL partner
    const extractPrix = async url => {
        const page = await browser.newPage();
        await page.goto(url);
        console.log(`scraping : ${url}`);

        // Scrape the data we want
        const partnersOnPage = await page.evaluate(() =>
            // Array.from(document.querySelectorAll("div.compact")).map(compact => ({
            //     title : compact.querySelector("h3.title").innerText.trim(),
            //     logo : compact.querySelector(".logo img").src
            // }))

            Array.from(document.querySelectorAll('div.content div.description span.price-tag '))
            .map(prix => ({prix : prix.innerText}))
        );
        await page.close();

        // Should we end recursion?
        if (partnersOnPage.length < 1){
            // Terminate if no partners exist
            console.log(`terminate recursion on: ${url}`)
            return partnersOnPage
        }else{
            // Go fletch the next page ? page = X + 1
            // What is the next url?
            const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
            const nextUrl = `https://www.afrikrea.com/fr/categories/clothing?
            page=${nextPageNumber}`;
            return partnersOnPage.concat(await extractPrix(nextUrl))
        }
    };

    const browser = await puppeteer.launch();
    const firstUrl = "https://www.afrikrea.com/fr/categories/clothing?page=1";
   // const partners = await extractPartners(firstUrl);
    const prix = await extractPrix(firstUrl);
    //console.log(partners);
    console.log(prix);

    // let data_url = JSON.stringify(partners, null, 2);
    // fs.writeFileSync('titres.json', data_url);

    let data_prix = JSON.stringify(prix, null, 2);
    fs.writeFileSync('prix.json', data_prix);

    await browser.close();

})();