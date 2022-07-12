const { default: BigNumber } = require('bignumber.js');
const puppeteer = require('puppeteer');
const collections = require('./collections.json');

(async () => {
    const browser = await puppeteer.launch();
    let totalNFTCount = 0
    let totalVolume = new BigNumber(-0);

    await Promise.all(collections.map(async (collection) => {
        console.log(collection.collectionId)
        const page = await browser.newPage();
        await page.goto(`https://api.nft.gamestop.com/nft-svc-marketplace/getCollectionStats?collectionId=${collection.collectionId}`);
        await page.content(); 
        const parsedMetrics = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText); 
        });

        totalNFTCount += parsedMetrics.itemCount

        const totalVolumeBN = new BigNumber(parsedMetrics.totalVolume);
        totalVolume = totalVolume.plus(totalVolumeBN)
    }));

    console.log(`Total NFT Count: ${totalNFTCount}`)
    console.log(`Total Volume: ${totalVolume.toString()}`)

    await browser.close();
})();