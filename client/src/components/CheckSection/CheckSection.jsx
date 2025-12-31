import styles from "./CheckSection.module.css";

import messageIcon from "../../assets/images/message.svg";
import linkIcon from "../../assets/images/link.svg";
import uploadIcon from "../../assets/images/upload.svg";

export default function CheckSection() {
  return (
    <section className={styles.section} id="checks" aria-label="מה אפשר לבדוק">
      <div className={styles.container}>
        <h2 className={styles.title}>מה אפשר לבדוק?</h2>
        <p className={styles.subtitle}>
          המערכת שלנו תומכת בסוגי תוכן שונים - כדי לשמור עליך ברשת
        </p>

        <div className={styles.cards}>
          {/* 1) ניתוח טקסט - צריך להיות מימין */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
                              <h3 className={styles.cardTitle}>ניתוח טקסט</h3>
              <img className={styles.icon} src={messageIcon} alt="" />

            </div>

            <p className={styles.cardText}>
  בדיקת הודעות, פוסטים ומיילים <br />
  לזיהוי קללות, שיח פוגעני, נסיונות <br />
  הונאה וסימנים לבריאות ברשת
</p>

          </article>

          {/* 2) בדיקת קישורים - באמצע */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
                 <h3 className={styles.cardTitle}>בדיקת קישורים</h3>
              <img className={styles.icon} src={linkIcon} alt="" />
             
            </div>

            <p className={styles.cardText}>
  בדיקה האם הקישור בטוח לפני <br />
  שלוחצים עליו <br />
  (פישינג, אתרים חשודים, התחזות)
</p>

          </article>

          {/* 3) בדיקת תמונות - משמאל */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
                 <h3 className={styles.cardTitle}>בדיקת תמונות</h3>
              <img className={styles.icon} src={uploadIcon} alt="" />
             
            </div>

            <p className={styles.cardText}>
              בדיקת טקסט מתוך תמונות כדי להבין דפוסי דיבור ומילים פוגעניות
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
