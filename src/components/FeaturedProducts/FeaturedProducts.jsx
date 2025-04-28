import React from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  console.log("Fetched data:", data); // Log the data for debugging

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type === "featured" ? "Featured Products" : "Trending Now"}</h1>
        <p>
          {type === "featured"
            ? "Curated excellence—our finest picks for the discerning shopper. Quality meets style in these standout selections."
            : "Hot off the rack—shop what’s buzzing right now. Don’t miss out on these crowd pullers!"}
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Something went wrong!"
          : loading
          ? "Loading..."
          : Array.isArray(data) && data.length > 0
          ? data.map((item) => <Card item={item} key={item.id} />)
          : "No products available"}
      </div>
    </div>
  );
};

export default FeaturedProducts;
