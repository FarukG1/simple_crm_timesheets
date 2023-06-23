import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <nav className={styles.nav}>
        <ul className={styles.navul}>
          <li className={styles.navli}>
            <Link href="/">Dashboard</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/kalender">Kalender</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/kontakte">Kontakte</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
