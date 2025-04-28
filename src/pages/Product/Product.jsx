import React, { useState, useEffect } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/cartReducer.js";
import { useDispatch } from "react-redux";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();
  // Fetch all products
  const { data: allProducts, loading, error } = useFetch("products?populate=*");

  // Find the specific product when data loads
  useEffect(() => {
    if (allProducts) {
      const foundProduct =
        allProducts.data?.find((item) => item.id == id) ||
        allProducts.find((item) => item.id == id);
      setProductData(foundProduct);
    }
  }, [allProducts, id]);

  // Use productData instead of data in your JSX
  const data = productData;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching product:", error);
    return <div>Error fetching product data.</div>;
  }

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img
            src={import.meta.env.VITE_APP_UPLOAD_URL + data?.img?.url}
            alt="Product Image 1"
            onClick={() => setSelectedImg("img")}
          />
          <img
            src={import.meta.env.VITE_APP_UPLOAD_URL + data?.img2?.url}
            alt="Product Image 2"
            onClick={() => setSelectedImg("img2")}
          />
        </div>
        <div className="mainImg">
          <img
            src={import.meta.env.VITE_APP_UPLOAD_URL + data?.[selectedImg]?.url}
            alt="Main Product"
          />
        </div>
      </div>
      <div className="right">
        <h1>{data?.title}</h1>
        <span className="price">PKR {data?.price}</span>
        <p>{data?.desc}</p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button
          className="add"
          onClick={() =>
            dispatch(
              addToCart({
                id: data.id,
                title: data.title,
                desc: data.desc,
                price: data.price,
                img: data.img,
                quantity,
              })
            )
          }
        >
          <AddShoppingCartIcon /> ADD TO CART
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorderIcon /> ADD TO WISH LIST
          </div>
          <div className="item">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>
        <div className="info">
          <span>Vendor: Polo</span>
          <span>Product Type: T-Shirt</span>
          <span>Tag: T-Shirt, Women, Top</span>
        </div>
        <hr />
        <div className="info">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
