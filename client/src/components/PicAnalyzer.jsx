import { useState, useRef } from "react";
import PropTypes from "prop-types";
import imgIcon from "../assets/images/img-icon.png"; // וודאי שהנתיב נכון לפי מבנה התיקיות שלך

function PicAnalyzer({ onClose }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // פונקציה לבחירת קובץ ותצוגה מקדימה
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  // שליחת התמונה לשרת
  async function analyzePic() {
    setError("");
    setResult(null);
    if (!selectedFile) {
      setError("אופס! שכחת להעלות תמונה לבדיקה 🙂");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const resp = await fetch("http://localhost:4000/api/ocr/analyze", { // וודאי שזה הנתיב החדש
        method: "POST",
        body: formData 
        });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Server Error");
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("משהו השתבש בניתוח התמונה. בדקו שהשרת רץ.");
    } finally {
      setLoading(false);
    }
  }

  // לוגיקת הצבעים והאייקונים לפי הציון
  const getTheme = (score) => {
    if (score >= 4) return { color: "#FF4D4D", icon: "🚨", status: "זוהתה סכנה", bg: "#FFF5F5" };
    if (score >= 2.6) return { color: "#FFC107", icon: "⚠️", status: "חשוב להיזהר", bg: "#FFFBEB" };
    return { color: "#2ECC71", icon: "✅", status: "הכל נראה בטוח", bg: "#F0FFF4" };
  };

  const theme = result ? getTheme(result.score) : { color: "#3D5A80" };

  return (
    <div style={{
      width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "40px",
      direction: "rtl", backgroundColor: "#F0F7FF", borderRadius: "32px",
      border: "2px dashed #3D5A80", boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
      boxSizing: "border-box", position: "relative", textAlign: "right",
      fontFamily: "'Rubik', sans-serif"
    }}>
      
      {/* כפתור סגירה */}
      <button onClick={onClose} type="button" style={{
          position: "absolute", top: "25px", right: "25px", padding: "10px 18px",
          backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px",
          cursor: "pointer", fontSize: "15px", color: "#4A5568", fontWeight: "bold"
        }}>
        סגירה ✕
      </button>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "34px", color: "#1A375D", marginBottom: "8px", fontWeight: "800" }}>
          ניתוח צילומי מסך
        </h2>
        <p style={{ color: "#4A5568", fontSize: "18px" }}>העלו צילום מסך כדי לזהות דפוסים חשודים, הונאות או שיח פוגעני</p>
      </div>

      {/* אזור העלאת הקובץ */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", padding: "20px", marginBottom: "20px", border: "1px solid #E2E8F0" }}>
        <div style={{ textAlign: "center" }}>
          <div onClick={triggerFileSelect} style={{
              border: "2px dashed #3D5A80", borderRadius: "20px", padding: "30px",
              cursor: "pointer", backgroundColor: "#F8FAFC"
            }}>
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "250px", borderRadius: "10px" }} />
            ) : (
              <>
                <div style={{ fontSize: "50px" }}>📸</div>
                <p style={{ fontWeight: "bold", color: "#3D5A80" }}>לחצו כאן לבחירת צילום מסך מהגלריה</p>
              </>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }} />
        </div>
      </div>

      {/* כפתור הפעלה */}
      <button onClick={analyzePic} disabled={loading} style={{
          width: "100%", padding: "20px", backgroundColor: "#4A90E2", color: "white",
          border: "none", borderRadius: "16px", fontSize: "20px", fontWeight: "bold",
          cursor: "pointer", opacity: loading ? 0.7 : 1
        }}>
        {loading ? "סורק ומנתח..." : "נתחו את התמונה עכשיו"}
      </button>

      {error && <p style={{ color: "#E53E3E", textAlign: "center", marginTop: "15px" }}>{error}</p>}

      {/* הצגת תוצאות הניתוח */}
      {result && (
        <div style={{
          backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "30px",
          border: `2px solid ${theme.color}`, marginTop: "30px", boxShadow: "0 8px 25px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
            <span style={{ fontSize: "45px" }}>{theme.icon}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: "26px", color: theme.color, fontWeight: "800" }}>{theme.status}</h3>
              <p style={{ margin: 0, color: "#718096", fontSize: "16px" }}>דירוג סיכון: {result.score} / 5</p>
            </div>
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ fontWeight: "700", marginBottom: "8px" }}>ניתוח המערכת:</h4>
            <div style={{ backgroundColor: "#F8FAFC", padding: "20px", borderRadius: "15px", border: "1px solid #E2E8F0" }}>
              {result.explanation}
            </div>
          </div>

          {result.recommendation && (
            <div style={{ backgroundColor: theme.bg, padding: "20px", borderRadius: "15px", borderRight: `6px solid ${theme.color}` }}>
              <strong>💡 המלצה לפעולה:</strong>
              <p style={{ margin: "5px 0 0 0" }}>{result.recommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

PicAnalyzer.propTypes = { onClose: PropTypes.func.isRequired };
export default PicAnalyzer;