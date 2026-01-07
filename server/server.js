import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// routes
import moderationRoutes from "./routes/moderationRoutes.js";
import instagramRoutes from "./routes/instagram.routes.js";
import scoringRoutes from "./routes/scoring.routes.js";
import { connectMongo } from "./src/db/mongoose.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log(`[Server] ${req.method} ${req.url}`);
  next();
});

console.log("--- Server Start ---");
console.log("CLIENT_URL =", process.env.CLIENT_URL || "(not set)");
console.log("Has OPENAI_API_KEY?", Boolean(process.env.OPENAI_API_KEY));
console.log("Has RAPIDAPI_KEY?", Boolean(process.env.RAPIDAPI_KEY));
console.log("Has MONGODB_URI?", Boolean(process.env.MONGODB_URI));

app.use("/api", moderationRoutes);
app.use("/api/instagram", instagramRoutes);
app.use("/api/scoring", scoringRoutes);

try {
  await connectMongo();
  console.log("Mongo connect attempt finished");
} catch (err) {
  console.log("Mongo connection failed (continuing without DB):", err?.message);
}

const PORT = process.env.PORT || 4000;
app.get("/__whoami", (req, res) => {
  res.json({ ok: true, running: "server.js", pid: process.pid });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
