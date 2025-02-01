import "./Home.css";
import Footer from "../Footer";
import Intro from "../Intro";
import MagSlider from "../MagSlider";
import SlideSwiper from "../SlideSwiper";
import SlideProduct from "../SlideProduct";
import ContactSection from "../ContactSection";
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "normalize.css";

function Home() {
  return (
    <>
      <SlideSwiper />
      <Intro />
      <SlideProduct />
      <MagSlider />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Home;
