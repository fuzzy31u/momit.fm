import styles from "../styles/Home.module.css";
import { siteDescription } from "../const"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_overlay}></div>
      <h1 className={styles.title}>
        <a href="/">momit.fm</a>
      </h1>
      <p className={styles.description}>
        {siteDescription}
      </p>
    </header>
  )
}