import React, { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import Link from 'next/link'
const { getEthPriceNow } = require('get-eth-price')
const pow = BigNumber(10).pow(18)

const GridItem = (props) => {
  return (
    <h2 style={{ display: 'inline-grid', margin: '0', ...props.style }}>
      {props.children}
    </h2>
  )
}

const USDCurrencyConfig = {
  style: 'currency',
  currency: 'USD'
}

const locale = Intl.DateTimeFormat().resolvedOptions().locale
const currencyFormatter = new Intl.NumberFormat(locale, USDCurrencyConfig)
const numberFormatter = new Intl.NumberFormat(locale)

async function getPrice(volume) {
  const priceResponse = await getEthPriceNow()
  const entryKey = Object.keys(priceResponse)[0]
  const usdConversion = priceResponse[entryKey].ETH.USD
  const totalUSDVolume = (volume * usdConversion)
  return {
    volume: currencyFormatter.format(totalUSDVolume),
    fees: currencyFormatter.format(totalUSDVolume * 0.0225)
  }
}


export default function Metrics({ totalCount, totalVolume }) {
  const [totalETHVolumeDisplay, setTotalETHVolumeDisplay] = React.useState(0)
  const [totalUSDVolumeDisplay, setTotalUSDVolumeDisplay] = React.useState(0)
  const [feesUSDDisplay, setFeesUSDDisplay] = React.useState(0)

  const totalVolumeBN = useMemo(() => {
    const bn = BigNumber(totalVolume).div(pow)
    setTotalETHVolumeDisplay(bn.toFixed(2))
    return bn
  }, [totalVolume])

  useEffect(() => {
    const handleGetPrice = async () => {
      const { fees, volume } = await getPrice(totalVolumeBN)
      setTotalUSDVolumeDisplay(volume)
      setFeesUSDDisplay(fees)
    }
    handleGetPrice()
  }, [totalVolumeBN]);

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          columnGap: '20px',
          rowGap: '20px',
        }}
      >
        <GridItem style={{ justifyContent: 'end' }}>
          {numberFormatter.format(totalCount)}
        </GridItem>
        <GridItem>NFTs</GridItem>

        <GridItem style={{ justifyContent: 'end' }}>
          {numberFormatter.format(totalETHVolumeDisplay)}
        </GridItem>
        <GridItem>ETH Volume</GridItem>

        <GridItem style={{ justifyContent: 'end' }}>
          {totalUSDVolumeDisplay}
        </GridItem>
        <GridItem>Volume</GridItem>

        <GridItem style={{ justifyContent: 'end' }}>
          {feesUSDDisplay}
        </GridItem>
        <GridItem>Fees&#x2a;</GridItem>
      </div>

      <p style={{ display: 'flex', justifyContent: 'center' }}>
        &#x2a; <Link href="https://github.com/kowsheek/nft-gamestop-marketplace-metrics/issues/1">Assuming 2.25&#x25; of volume</Link>
      </p>
    </div>
  )
}
