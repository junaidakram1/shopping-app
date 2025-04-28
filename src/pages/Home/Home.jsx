import React from "react";
import Slider from "../../components/Slider/Slider.jsx";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts.jsx";
import "./home.scss";
import Categories from "../../components/Categories/Categories.jsx";
import Newsletter from "../../components/Newsletter/Newsletter.jsx";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="trending" />
      <Newsletter />
    </div>
  );
};

export default Home;
