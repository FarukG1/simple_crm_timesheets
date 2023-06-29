import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function NavBar({ page }) {
  // Calculate wich styles to use
  const activeStyle = (_page, element) => {
    if (element == "li") {
      if (_page == page) {
        return `${styles.navli} ${styles.active}`;
      } else {
        return `${styles.navli} ${styles.inactive}`;
      }
    }
    if (element == "Link") {
      if (_page == page) {
        return `${styles.navLink} ${styles.active}`;
      } else {
        return `${styles.navLink} ${styles.inactive}`;
      }
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <nav className={styles.nav}>
        <ul className={styles.navul}>
          <li className={activeStyle("dashboard", "li")}>
            <Link className={activeStyle("dashboard", "Link")} href="/">
              Dashboard
            </Link>
          </li>
          <li className={activeStyle("kalender", "li")}>
            <Link className={activeStyle("kalender", "Link")} href="/kalender">
              Kalender
            </Link>
          </li>
          <li className={activeStyle("kontakte", "li")}>
            <Link className={activeStyle("kontakte", "Link")} href="/kontakte">
              Kontakte
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
