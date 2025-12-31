import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          LOGO
        </div>

        <nav className={styles.links}>
          <a className={styles.link} href="#checks">מה אפשר לבדוק?</a>
          <a className={styles.link} href="#how">איך זה עובד?</a>
        </nav>
      </div>
    </header>
  );
}
