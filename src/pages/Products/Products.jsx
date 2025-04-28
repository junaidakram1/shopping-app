import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.scss";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  console.log("Fetching category with ID:", catId);
  // Fetch sub-categories
  const {
    data: subCatData,
    loading: subCatLoading,
    error: subCatError,
  } = useFetch(`/sub-categories?[populate]=*`);

  // Fetch category details
  const { data: allCategories } = useFetch(
    "http://localhost:1337/api/categories"
  );

  // Find specific category
  const category =
    allCategories?.data?.find((c) => c.id == catId) ||
    allCategories?.find((c) => c.id == catId);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCats((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <h1 style={{ textTransform: "uppercase" }}>
          {category?.title || "Loading..."}
        </h1>

        <div className="filterItem">
          <h2>Product Categories</h2>
          {subCatLoading ? (
            <p>Loading sub-categories...</p>
          ) : subCatError ? (
            <p>Error loading sub-categories</p>
          ) : (
            subCatData?.map((item) => {
              const subCatId = item.id || item?.attributes?.id;
              const subCatTitle = item.title || item?.attributes?.title;

              return (
                <div className="inputItem" key={subCatId}>
                  <input
                    type="checkbox"
                    id={subCatId}
                    value={subCatId}
                    onChange={handleChange}
                    disabled={subCatLoading}
                  />
                  <label htmlFor={subCatId}>{subCatTitle}</label>
                </div>
              );
            })
          )}
        </div>

        {/* Rest of your filter items... */}
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={25000}
              onChange={(e) => setMaxPrice(e.target.value)}
              value={maxPrice}
            />
            <span>{maxPrice}</span>
          </div>
        </div>

        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={() => setSort("asc")}
              checked={sort === "asc"}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={() => setSort("desc")}
              checked={sort === "desc"}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>

      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Category banner"
        />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

export default Products;
