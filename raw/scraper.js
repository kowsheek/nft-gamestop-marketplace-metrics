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
            try {
                return JSON.parse(document.querySelector("body").innerText); 
            } catch (e) {
                return null;
            }
        });

        if(parsedMetrics !== null) {
            totalNFTCount += parsedMetrics.itemCount

            const totalVolumeBN = new BigNumber(parsedMetrics.totalVolume);
            totalVolume = totalVolume.plus(totalVolumeBN)
        }
    }));

    console.log(`Timestamp: ${Math.floor(new Date().getTime() / 1000)}`)
    console.log(`Total NFT Count: ${totalNFTCount}`)
    console.log(`Total Volume: ${totalVolume.toString()}`)

    await browser.close();
})();