import { useMemo } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import moment from 'moment';
import Link from 'next/link';
import Metrics from '@components/Metrics';

export default function Home() {

  const duration = moment("20220711", "YYYYMMDD").fromNow()

  return (
    <div className="container">
      <Head>
        <title>GameStop NFT Marketplace Metrics</title>
      </Head>
      <main>
        <Header title="GameStop NFT Marketplace Metrics" />
        <p className="description">
          <Link href={'https://nft.gamestop.com'}>GameStop NFT Marketplace</Link> launched {duration}.
        </p>
        <p>
          <Metrics totalCount={53361} totalVolume={746978453125734600000}></Metrics>
        </p>
        <p>Last updated at 11/07/2022 23:00 EST</p>
      </main>
      <Footer />
    </div>
  )
}
