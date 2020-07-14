// 1 - Import de puppeteer
const puppeteer = require('puppeteer');
const fs = require('fs');

/*
// 2 - Récupération des URLs de toutes les pages à visiter
- waitFor("body"): met le script en pause le temps que la page se charge
- document.querySelectorAll(selector): renvoie tous les noeuds qui vérifient le selecteur
- [...document.querySelectorAll(selector)]: caste les réponses en tableau
- Array.map(link => link.href): récupère les attributs href de tous les liens
*/

const getAllUrl = async browser => {
  const page = await browser.newPage()
  await page.goto('https://www.afrikrea.com/fr/categories/clothing')
  await page.waitFor('body')
  
  const result = await page.evaluate(() =>
  Array.from(document.querySelectorAll('div.card div.content div.title a'))
        .map(url => ({ url : url.href}))
  )
  return result
}

// 3 - Récupération des élèments à partir d'une url
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitFor('body')
  return page.evaluate(() => {

    let photo = Array.from(document.querySelectorAll('div.product-photo-thumbnails a img')).map(photo => photo.src)
    // //let titre = document.querySelector('h1').innerText
    // let titre = document.querySelector('h1')
    // if(titre != null){
    //   titre = titre.innerText
    // }

    // //let lieu = document.querySelector('dd.author').innerText
    // let lieu = document.querySelector('dd.author')
    // if(lieu != null){
    //   lieu = lieu.innerText
    // }

    // //let desc = document.querySelector('div.mec-events-content').innerText
    // let desc = document.querySelector('div.mec-events-content')
    // if(desc != null){
    //   desc = desc.innerText
    // }

    // //let logo = document.querySelector('div.mec-events-event-image img').src


    // //let debut = document.querySelector('span.mec-start-date-label').innerText
    // let debut = document.querySelector('span.mec-start-date-label')
    // if(debut != null){
    //   debut = debut.innerText
    // }

    // //let fin = document.querySelector('span.mec-end-date-label').textContent
    // let fin = document.querySelector('span.mec-end-date-label')
    // if(fin != null){
    //   fin = fin.innerText
    // }

    // return { titre, lieu, desc, debut, fin}

    return {photo}
  })
}

/*
// 4 - Fonction principale : instanciation d'un navigateur et renvoi des résultats
- urlList.map(url => getDataFromUrl(browser, url)):
appelle la fonction getDataFromUrl sur chaque URL de `urlList` et renvoi un tableau

- await Promise.all(promesse1, promesse2, promesse3):
bloque de programme tant que toutes les promesses ne sont pas résolues
*/
const scrap = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const urlList = await getAllUrl(browser)
  const results = await Promise.all(
    urlList.map(url => getDataFromUrl(browser, url)),
  )
  browser.close()
  let data = JSON.stringify(results, null, 2);
  fs.writeFileSync('../json/afrikrea/afrikrea.json', data);
  
  return results
}

// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
scrap()
  .then(value => {
    console.log(value)
  })
  .catch(e => console.log(`error: ${e}`))