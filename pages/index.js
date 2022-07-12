import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from 'next/link';
import Metrics from '@components/Metrics';

export default function Home() {

  dayjs.extend(relativeTime);
  const duration = dayjs("2022-07-11").fromNow()

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
        <Metrics totalCount={53520} totalVolume={1.56459450721834043337e+21}></Metrics>
        <p>Last updated at 12/07/2022 10:00 EST</p>
      </main>
      <Footer />
    </div>
  )
}
