import PropTypes from "prop-types";
import styles from "./CheckCard.module.css";

export default function CheckCard(props) {
  const { title, text, icon, type, isActive, onClick } = props;

  function handleClick() {
    if (onClick) onClick(type);
  }

  // חיבור הקלאסים - אם אקטיבי, מוסיף את הסטייל של ה-active
  const cardClass = `${styles.card} ${isActive ? styles.active : ""}`;

  return (
    <button type="button" className={cardClass} onClick={handleClick}>
      <div className={styles.head}>
        <img className={styles.icon} src={icon} alt={title} />
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>

      <p className={styles.cardText}>{text}</p>
      
      {isActive && <div className={styles.indicator}>בחור</div>}
    </button>
  );
}

CheckCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

CheckCard.defaultProps = {
  isActive: false,
  onClick: null,
};