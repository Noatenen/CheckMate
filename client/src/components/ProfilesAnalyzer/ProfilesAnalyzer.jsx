import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProfilesAnalyzer.module.css";

function ProfilesAnalyzer(props) {
  var onClose = props.onClose;

  var [loadingText, setLoadingText] = useState("");
  var [platform, setPlatform] = useState(null);
  var [igFollowers, setFollowers] = useState("");
  var [igFollowing, setFollowing] = useState("");
  var [username, setUsername] = useState("");
  var [result, setResult] = useState(null);

  var canAnalyze = useMemo(function () {
    return username.trim().length > 0;
  }, [username]);

  function handlePlatformSelect(selectedPlatform) {
    setPlatform(selectedPlatform);
    setLoadingText("");
    setResult(null);
  }

  async function handleAnalyze() {
    try {
      setLoadingText("בודקות...");
      setResult(null);

      if (platform !== "instagram") {
        setLoadingText("כרגע יש תמיכה רק באינסטגרם");
        return;
      }

      var clean = username.trim();
      if (!clean) {
        setLoadingText("תכתבי שם משתמש");
        return;
      }

      // POST -> analyze (בדמו בלי DB: אנחנו מציגות את מה שחוזר מה-POST)
      var analyzeRes = await fetch("http://localhost:4000/api/instagram/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: clean,
          followers_count: igFollowers,
          following_count: igFollowing,
        }),
      });

      var analyzeData = await analyzeRes.json();

      if (!analyzeRes.ok || !analyzeData.ok) {
        setLoadingText(analyzeData.error ? "שגיאה: " + analyzeData.error : "שגיאה לא צפויה");
        return;
      }

      setResult(analyzeData);
      setLoadingText("");
    } catch {
      setLoadingText("שגיאת רשת - ודאי שהשרת רץ על פורט 4000");
    }
  }

  var scoring = result?.profile?.scoring || result?.scoring || null;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <h2 className={styles.title} style={{ margin: 0 }}>
            בדיקת פרופיל ברשתות חברתיות
          </h2>

          {onClose ? (
            <button type="button" onClick={onClose} className={styles.Platformbutton}>
              סגירה
            </button>
          ) : null}
        </div>

        <textarea
          className={styles.textarea}
          placeholder="הדביקו שם משתמש (למשל: noa.tenenbaum)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <h3 className={styles.subTitle}>איזו פלטפורמה?</h3>

        <div className={styles.platformRow}>
          <button
            type="button"
            onClick={() => handlePlatformSelect("instagram")}
            className={`${styles.Platformbutton} ${platform === "instagram" ? styles.selected : ""}`}
          >
            Instagram
          </button>

          <button
            type="button"
            onClick={() => handlePlatformSelect("facebook")}
            className={`${styles.Platformbutton} ${platform === "facebook" ? styles.selected : ""}`}
          >
            Facebook (בקרוב)
          </button>
        </div>

        {platform === "instagram" ? (
          <div className={styles.instagramFields}>
            <h4>פרטים נוספים (אופציונלי)</h4>

            <label className={styles.fieldLabel}>
              מספר עוקבים:
              <input
                className={styles.input}
                type="number"
                min="0"
                value={igFollowers}
                onChange={(e) => setFollowers(e.target.value)}
              />
            </label>

            <label className={styles.fieldLabel}>
              מספר נעקבים:
              <input
                className={styles.input}
                type="number"
                min="0"
                value={igFollowing}
                onChange={(e) => setFollowing(e.target.value)}
              />
            </label>
          </div>
        ) : null}

        <button className={styles.analyzeBtn} onClick={handleAnalyze} disabled={!canAnalyze} type="button">
          בדיקה
        </button>

        <h6 className={styles.status}>{loadingText}</h6>
      </div>

      {scoring ? (
        <div className={styles.resultBox}>
          <h3>תוצאה</h3>

          <p>
            <strong>רמת סיכון:</strong>{" "}
            <span className={styles[scoring.label] || ""}>{scoring.label}</span>
          </p>

          {scoring.score != null ? (
            <p>
              <strong>ציון:</strong> {scoring.score} / 5
            </p>
          ) : null}

          {Array.isArray(scoring.reasons) && scoring.reasons.length > 0 ? (
            <>
              <h4>מה השפיע על הציון?</h4>
              <ul>
                {scoring.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

ProfilesAnalyzer.propTypes = {
  onClose: PropTypes.func,
};

ProfilesAnalyzer.defaultProps = {
  onClose: null,
};

export default ProfilesAnalyzer;
