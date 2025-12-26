import { useState } from 'react';
import styles from './ProfilesAnalyzer.module.css';


function ProfilesAnalyzer() {
  const [loadingText, setLoadingText] = useState('');

  const handleAnalyze = () => {
    setLoadingText('Loading...');
  };

  return (
    <div>
      <h2>Social Profiles Safety Analyzer</h2>
      <textarea placeholder="Paste username here..." />
      <br />
      <h3>Which platform?</h3>
      <button className={styles.Platformbutton}>Instagram</button>
      <button className={styles.Platformbutton}>Facebook</button>
      <button className={styles.Platformbutton}>Phone Number</button>
      <button className={styles.Platformbutton}>TikTok</button>
      <br /><br /><br />
      <button onClick={handleAnalyze}>Analyze</button>
      <h6>{loadingText}</h6>
    </div>
  );
}

export default ProfilesAnalyzer;
