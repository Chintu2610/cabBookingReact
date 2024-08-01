import FeatureProduct from "./components/FeatureProduct";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

const Home = () => {
  const data = {
    name: "Seamless Cab Booking Experience at Your Fingertips",
  };

  return (
    <>
      <HeroSection myData={data} />
      {/* <FeatureProduct /> */}
      {/* <img 
        src={`${process.env.PUBLIC_URL}/images/cabImages/cab-1.jpg`} 
        alt="Cab" 
        style={{ width: '100%', height: 'auto' }} // Optional: for styling
      /> */}
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
