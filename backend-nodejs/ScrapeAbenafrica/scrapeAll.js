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
  await page.goto('https://abenafrica.com/afro-agenda/')
  await page.waitFor('body')

  // setTimeout(() => { page.click('.mec-load-more-button'); }, 5000);

  // await page.waitForSelector('.mec-load-more-button')
  // await page.click('.mec-load-more-button')
  
  const result = await page.evaluate(() =>
  [...document.querySelectorAll('.mec-event-title a')].map(link => link.href),
  )
  return result
}

// 3 - Récupération des élèments à partir d'une url
const getDataFromUrl = async (browser, url) => {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitFor('body')
  return page.evaluate(() => {

    //Création de id
    let url = document.URL
    let urlSansHttps = url.replace(/https:/gi, '')
    let urlSansHttpsSansPoint = urlSansHttps.replace(/[.]/gi, '')
    let urlSansHttpsSansPointTire = urlSansHttpsSansPoint.replace(/-/gi, '')
    let id = urlSansHttpsSansPointTire.replace( /[/]/gi, '')

    //Récupération de titre
    let titre = document.querySelector('h1')
    if(titre != null){
      titre = titre.innerText
    }

    //Récupération de lieu
    let lieu = document.querySelector('dd.author')
    if(lieu != null){
      lieu = lieu.innerText
    }

    //Récupération de la description
    let desc = document.querySelector('div.mec-events-content')
    if(desc != null){
      desc = desc.innerText
    }
    
    //Récupération de la date de début
    let debut = document.querySelector('span.mec-start-date-label')
    if(debut != null){
      debut = debut.innerText
    }
    
    //Récupération de la date de fin
    let fin = document.querySelector('span.mec-end-date-label')
    if(fin != null){
      fin = fin.innerText
    }
    
    //Récupération de l'heure
    let heure = document.querySelector("div.mec-single-event-time dd abbr.mec-events-abbr")
    if(heure !=null){
      heure = heure.innerText
    }

    return {id, titre, lieu, desc, debut, fin, heure}
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
  fs.writeFileSync('../json/abenafrica/abenafrica.json', data);
  fs.writeFileSync('../../configMongoDB/dataset/ebenafrica.json', data);
  return results
}

// 5 - Appel la fonction `scrap()`, affichage les résulats et catch les erreurs
scrap()
  .then(value => {
    console.log(value)
  })
  .catch(e => console.log(`error: ${e}`))
