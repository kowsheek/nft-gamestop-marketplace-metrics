import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
const { getEthPriceNow }= require('get-eth-price');
const pow = BigNumber(10).pow(18);

export default function Metrics({ totalCount, totalVolume }) {

    const [totalETHVolumeDisplay, setTotalETHVolumeDisplay] = React.useState(0);
    const [totalUSDVolumeDisplay, setTotalUSDVolumeDisplay] = React.useState(0);

    const totalVolumeBN = useMemo(() => {
        const bn = BigNumber(totalVolume).div(pow);
        setTotalETHVolumeDisplay(bn.toFixed(2));
        return bn;
    }, [totalVolume]);
    
    useEffect(async () => {
        async function getPrice() {
            const priceResponse = await getEthPriceNow()
            const entryKey = Object.keys(priceResponse)[0]
            const usdConversion = priceResponse[entryKey].ETH.USD
            setTotalUSDVolumeDisplay((totalVolumeBN * usdConversion).toFixed(2))
        }
        getPrice()
    }, [totalVolumeBN]);

    return <div>
        <h2 className="title">{totalCount} NFTs</h2>
        <h2 className="title">{totalETHVolumeDisplay} ETH Volume</h2>
        <h2 className="title">${totalUSDVolumeDisplay} USD Volume</h2>
    </div>
  }
  