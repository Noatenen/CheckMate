import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.title}>הישארו בטוחים ברשת</p>
        <p className={styles.text}>
          קחו שליטה על הבטיחות הדיגיטלית שלכם. בדקו תוכן עכשיו או למדו איך לזהות תונאות נפוצות.
        </p>
      </div>
    </footer>
  );
}
