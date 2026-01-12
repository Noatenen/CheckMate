import { useState } from "react";

import TextAnalyzer from "../../components/TextAnalyzer";
import ProfilesAnalyzer from "../../components/ProfilesAnalyzer/ProfilesAnalyzer";
import LinkCheckerTab from "../../components/LinkCheckerTab";
import PicAnalyzer from "../../components/PicAnalyzer";

import styles from "./Home.module.css";

import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import CheckSection from "../../components/CheckSection/CheckSection";
import Footer from "../../components/Footer/Footer";

export default function HomePage() {
  var [activeCheckType, setActiveCheckType] = useState(""); // "text" | "links" | "images" | "profiles" | ""

  function openCheck(type) {
    setActiveCheckType(type);

    // גלילה נעימה לפאנל אחרי שה־DOM מתעדכן
    setTimeout(function () {
      var el = document.getElementById("check-panel");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function closeCheck() {
    setActiveCheckType("");
  }

  return (
    <div className={styles.page}>
      <NavBar />
      <Hero />

      {/* החלק של שלוש הכרטיסיות */}
      <CheckSection activeType={activeCheckType} onSelect={openCheck} />

      {/* פאנל הבדיקה שמופיע בלחיצה */}
      {activeCheckType === "text" ? (
        <section
          id="check-panel"
          className={styles.checkPanel}
          aria-label="אזור בדיקה"
          style={{ width: "100%", padding: "20px 0" }}
        >
          <TextAnalyzer onClose={closeCheck} />
        </section>
      ) : null}

      {activeCheckType === "links" ? (
        <section
          id="check-panel"
          className={styles.checkPanel}
          aria-label="אזור בדיקת לינקים"
          style={{ width: "100%", padding: "20px 0" }}
        >
          <LinkCheckerTab onClose={closeCheck} />
        </section>
      ) : null}

      {activeCheckType === "profiles" ? (
        <section
          id="check-panel"
          className={styles.checkPanel}
          aria-label="אזור בדיקת פרופיל"
          style={{ width: "100%", padding: "20px 0" }}
        >
          <ProfilesAnalyzer onClose={closeCheck} />
        </section>
      ) : null}

      {activeCheckType === "pictures" ? (
        <section
          id="check-panel"
          className={styles.checkPanel}
          aria-label="אזור בדיקת תמונות"
          style={{ width: "100%", padding: "20px 0" }}
        >
          <PicAnalyzer onClose={closeCheck} />
        </section>
      ) : null}

      {/* הערה: אם בעתיד תוסיפו תמונות, תוכלו להוסיף כאן תנאים נוספים */}

      <Footer />
    </div>
  );
}
