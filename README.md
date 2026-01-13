# BeSafe 🛡️ | Full-Stack Digital Safety Platform

BeSafe is a full-stack web platform developed as part of the **QueenB × AppsFlyer Hackathon 2026**.  
The system provides real-time tools for analyzing digital content and identifying online safety risks such as harassment, phishing, and deceptive behavior.

---

## The Mission

In an era of increasing online threats, BeSafe aims to empower users with a centralized hub for evaluating digital content.  
The platform enables users to analyze **text, links, and images** and receive clear risk feedback that supports safer online decision-making.

---

## Core Features

### 🔍 Automated Screenshot OCR Analysis
- Image-processing module that extracts text from screenshots
- Enables detection of toxic language, harassment, and suspicious patterns
- Designed for real-world scenarios such as social media screenshots

### 🔗 Real-Time Phishing Detection
- Link-checking service that evaluates URLs based on predefined risk parameters
- Helps users identify potentially malicious or deceptive links

### 🎨 User-Centric UI/UX
- Modular dashboard built with React
- Clear visual feedback with a **Risk Scoring system (1–5)**
- Emphasis on accessibility, clarity, and user trust

### ⚙️ Robust Backend Architecture
- Scalable Node.js & Express server
- Secure file uploads and handling using Multer
- API-based architecture supporting future expansion

---

## Tech Stack

**Frontend**
- React (Hooks, props-driven architecture)
- CSS Modules for scoped and maintainable styling

**Backend**
- Node.js
- Express
- Multer (file uploads)

**DevOps & Workflow**
- Git & GitHub for version control and collaboration

---

## Project Structure

### Client Directory (`client/`)
Contains the React (Vite) frontend application.

- `package.json` – Client-side dependencies and scripts  
- `.env` – Frontend environment variables  
- `index.html` – Application entry point  
- `src/`
  - `components/` – Reusable UI components (text, link, and image analyzers)
  - `assets/` – Static assets and processed images
  - `styles/` – Modular CSS files
  - `services/` – API communication logic
  - `pages/` – Application views
  - `App.jsx` – Main React component
  - `index.jsx` – React DOM entry point

---

### Server Directory (`server/`)
Contains the Node.js / Express backend application.

- `package.json` – Server dependencies and scripts  
- `.env` – Server configuration variables  
- `server.js` – Express server entry point  
- `controllers/` – Business logic for OCR and link analysis  
- `routes/` – API endpoint definitions  
- `images/` – Uploaded and processed image files  

---

## Installation

### Prerequisites
- **Node.js** – version 20.x or higher (LTS recommended)
- **npm** – version 10.x or higher

---

### Clone the Repository
```bash
git clone <your-repository-url>
cd BeSafe
