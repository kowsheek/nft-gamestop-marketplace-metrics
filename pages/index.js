import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Metrics from '@components/Metrics';
import AggregateData from '../public/data/aggregate.json'

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
          <a href={'https://nft.gamestop.com'} target="_blank">GameStop NFT Marketplace</a> launched {duration}.
        </p>
        <Metrics totalCollections={AggregateData.totalCollections} totalCount={AggregateData.totalCount} totalVolume={AggregateData.totalVolumeETH}></Metrics>
        <p>Last updated at 15/07/2022 09:00 EST</p>
      </main>
      <Footer />
    </div>
  )
}
