import fs from "fs";
import path from "path";
import dotenv from "dotenv";
const envPath = path.join(process.cwd(), ".env");
const raw = fs.readFileSync(envPath, "utf8");
console.log("ENV has RAPIDAPI_KEY line?", /(^|\n)\s*RAPIDAPI_KEY\s*=/.test(raw));
dotenv.config({ path: envPath, override: true });
console.log("Has RAPIDAPI_KEY?", Boolean(process.env.RAPIDAPI_KEY));
console.log("RAPIDAPI_KEY prefix:", process.env.RAPIDAPI_KEY?.slice(0, 6));
console.log("MOCK_RAPID:", process.env.MOCK_RAPID);
import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import instagramRoutes from "./routes/instagram.routes.js";
import { connectMongo } from "./src/db/mongoose.js";
import scoringRoutes from "./routes/scoring.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
console.log("Has MONGODB_URI?", Boolean(process.env.MONGODB_URI));

const app = express();


app.use(express.json());
app.use((req, res, next) => {
  console.log(`[Server] Request received: ${req.method} ${req.url}`);
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images

app.use(cors({
  origin: '*'
}));

// Use the routes file for all `/ducks` routes
app.use("/api/instagram", instagramRoutes);
app.use("/api/scoring", scoringRoutes);


// Start server
await connectMongo();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
