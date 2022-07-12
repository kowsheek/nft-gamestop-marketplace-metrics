const puppeteer = require('puppeteer');
const collections = require('./collections.json');

(async () => {
    const browser = await puppeteer.launch();
    let totalNFTCount = 0
    let totalVolume = 0

    await Promise.all(collections.map(async (collection) => {
        console.log(collection.collectionId)
        const page = await browser.newPage();
        await page.goto(`https://api.nft.gamestop.com/nft-svc-marketplace/getCollectionStats?collectionId=${collection.collectionId}`);
        await page.content(); 
        const parsedMetrics = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText); 
        });

        totalNFTCount += parsedMetrics.itemCount
        totalVolume += parseFloat(parsedMetrics.totalVolume)
        console.log(parsedMetrics)
    }));

    console.log(`Total NFT Count: ${totalNFTCount}`)
    console.log(`Total Volume: ${totalVolume}`)
  
    await browser.close();
})();