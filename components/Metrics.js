import React, { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
const { getEthPriceNow } = require('get-eth-price')
const pow = BigNumber(10).pow(18)

const GridItem = (props) => {
  return (
    <h2 style={{ display: 'inline-grid', margin: '0', ...props.style }}>
      {props.children}
    </h2>
  )
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

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(async () => {
    async function getPrice() {
      const priceResponse = await getEthPriceNow()
      const entryKey = Object.keys(priceResponse)[0]
      const usdConversion = priceResponse[entryKey].ETH.USD
      const totalUSDVolume = totalVolumeBN * usdConversion
      setTotalUSDVolumeDisplay(totalUSDVolume.toFixed(2))
      setFeesUSDDisplay((totalUSDVolume * 0.0125).toFixed(2))
    }
    getPrice()
  }, [totalVolumeBN])

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
          {formatNumber(totalCount)}
        </GridItem>
        <GridItem>NFTs</GridItem>

        <GridItem style={{ justifyContent: 'end' }}>
          {formatNumber(totalETHVolumeDisplay)}
        </GridItem>
        <GridItem>ETH Volume</GridItem>

        <GridItem style={{ justifyContent: 'end' }}>
          ${formatNumber(totalUSDVolumeDisplay)}
        </GridItem>
        <GridItem>USD Volume</GridItem>

        <GridItem style={{ justifyContent: 'end' }}>
          ${formatNumber(feesUSDDisplay)}
        </GridItem>
        <GridItem>USD Fees&#x2a;</GridItem>
      </div>

      <p style={{ display: 'flex', justifyContent: 'center' }}>
        &#x2a; Assuming 1.25&#x25; of volume
      </p>
    </div>
  )
}
