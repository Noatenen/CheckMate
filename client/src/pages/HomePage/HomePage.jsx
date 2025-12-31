import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import CheckSection from "../../components/CheckSection/CheckSection";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className={styles.home}>
      <NavBar />
      <Hero />
      <CheckSection />
      <Footer />
    </div>
  );
};

export default Home;
