import Link from "next/link";
import styles from "../styles/Home.module.css";
import { siteDescription } from "../const"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_overlay}></div>
      <h1 className={styles.title}>
        <Link href="/">momit.fm</Link>
      </h1>
      <p className={styles.description}>
        {siteDescription}
      </p>
    </header>
  )
}