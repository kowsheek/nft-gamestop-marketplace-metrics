import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';

export default function Metrics({ totalCount, totalVolume }) {

    const totalVolumeDisplay = useMemo(() => {
        const pow = BigNumber(10).pow(18);
        return BigNumber(totalVolume).div(pow).toString();
    }, [totalVolume]);


    return <div>
        <h2 className="title">{totalCount} NFTs</h2>
        <h2 className="title">{totalVolumeDisplay} ETH Volume</h2>
    </div>
  }
  