import express from "express";
import multer from "multer";
import { ocrAnalyze } from "../controllers/ocrServiceController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/png", "image/jpeg", "image/webp"].includes(file.mimetype);
    cb(ok ? null : new Error("Unsupported file type"), ok);
  },
});

// שימי לב: השדה נקרא "image"
router.post("/analyze", upload.single("image"), ocrAnalyze);

export default router;