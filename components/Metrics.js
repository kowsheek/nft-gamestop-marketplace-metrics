import React, { useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { getEthPriceNow } from 'get-eth-price';
const pow = BigNumber(10).pow(18);

const USDCurrencyConfig = {
    style: 'currency',
    currency: 'USD'
}

const locale = Intl.DateTimeFormat().resolvedOptions().locale

async function getPrice(volume) {
    const priceResponse = await getEthPriceNow()
    const entryKey = Object.keys(priceResponse)[0]
    const usdConversion = priceResponse[entryKey].ETH.USD
    const totalUSDVolume = (volume * usdConversion)
    return {
        volume: currencyFormatter.format(totalUSDVolume),
        fees: currencyFormatter.format(totalUSDVolume * 0.0125)
    }
}

const currencyFormatter = new Intl.NumberFormat(locale, USDCurrencyConfig)

export default function Metrics({ totalCount, totalVolume }) {

    const [totalETHVolumeDisplay, setTotalETHVolumeDisplay] = React.useState(0);
    const [totalUSDVolumeDisplay, setTotalUSDVolumeDisplay] = React.useState(0);
    const [feesUSDDisplay, setFeesUSDDisplay] = React.useState(0);

    const totalVolumeBN = useMemo(() => {
        const bn = BigNumber(totalVolume).div(pow);
        setTotalETHVolumeDisplay(bn.toFixed(2));
        return bn;
    }, [totalVolume]);
    
    useEffect(() => {
        const handleGetPrice = async () => {
            const { fees, volume } = await getPrice(totalVolumeBN)
            setTotalUSDVolumeDisplay(volume)
            setFeesUSDDisplay(fees)
        }
        handleGetPrice()
    }, [totalVolumeBN]);

    return <div>
        <h2 className="title">{totalCount} NFTs</h2>
        <h2 className="title">{totalETHVolumeDisplay} ETH Volume</h2>
        <h2 className="title">{totalUSDVolumeDisplay} Volume</h2>
        <h2 className="title">{feesUSDDisplay} Fees&#x2a;</h2>

        <p>&#x2a; Assuming 1.25&#x25; of volume</p>
    </div>
  }
  