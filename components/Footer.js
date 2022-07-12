import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p>Not affiliated with GameStop. Built in about an hour. <Link href={'https://twitter.com/kowsheek'}>Let me know what's breaking.</Link></p>
      </footer>
    </>
  )
}
