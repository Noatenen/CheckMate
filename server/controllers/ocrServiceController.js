import vision from "@google-cloud/vision";
import { getDeepAIAnalysis, findBadWords } from "./moderationController.js";

const client = new vision.ImageAnnotatorClient();

export async function ocrAnalyze(req, res) {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ error: "Missing image file (field name: image)" });
    }

    const [result] = await client.textDetection({
      image: { content: req.file.buffer },
      imageContext: { languageHints: ["he", "en"] },
    });

    const extractedText = (result?.fullTextAnnotation?.text || "").trim();
    if (!extractedText) {
        return res.json({
            success: true,
            score: 1,
            explanation: "לא זוהה טקסט בתמונה הזו, לכן היא נראית בטוחה.",
            extractedText: ""
        });
        }
    const [badWords, aiAnalysis] = await Promise.all([
      Promise.resolve(findBadWords(extractedText)),
      getDeepAIAnalysis(extractedText)
    ]);

    // 4. חישוב הציון המשוקלל (כפי שמופיע ב-moderationController שלך)
    let finalScore = aiAnalysis.score;
    if (badWords.length > 0) {
      finalScore = badWords.length > 2 ? Math.max(finalScore, 4) : Math.max(finalScore, 3);
    }

    // 5. החזרת התשובה המלאה לפרונטנד
    return res.json({
      success: true,
      extractedText,
      score: Math.min(5, finalScore), // וידוא טווח 1-5
      category: aiAnalysis.category,
      explanation: aiAnalysis.explanation,
      recommendation: aiAnalysis.urgent_action,
      meta: {
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });

  } catch (err) {
    console.error("OCR Error:", err);
    return res.status(500).json({ error: "OCR_ANALYZE_FAILED", details: err.message });
  }
}