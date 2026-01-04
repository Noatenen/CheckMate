import styles from './styles/App.module.css';
import ProfilesAnalyzer from './components/ProfilesAnalyzer/ProfilesAnalyzer';
import ProfilesScore from './components/ProfilesResults/ProfilesScore'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <nav className={styles.appNav}>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<ProfilesAnalyzer />} />
            <Route path ="/results" element={<ProfilesScore/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
