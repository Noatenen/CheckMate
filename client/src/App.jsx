import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/HomePage/HomePage";
import styles from "./styles/App.module.css";
import TextAnalyzerPage from "./pages/TextAnalyzerPage/TextAnalyzerPage";

import projectLogo from "./assets/project-logo.png";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={projectLogo} alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>
              Home
            </Link>
            <Link to="/text" className={styles.appLink}>
              Text Analyzer
            </Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text" element={<TextAnalyzerPage />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
