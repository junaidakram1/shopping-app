import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  if (!item) return null; // safeguard

  // Accessing the 'attributes' or the item directly
  const data = item.attributes ?? item;

  const { title, isNew, price, img, img2, oldPrice } = data;
  const uploadUrl = import.meta.env.VITE_APP_UPLOAD_URL;

  // Constructing the image URLs
  const mainImageUrl = img?.url ? uploadUrl + img.url : null;
  const secondImageUrl = img2?.url ? uploadUrl + img2.url : null;

  console.log("Main image URL:", mainImageUrl);
  console.log("Second image URL:", secondImageUrl);

  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {isNew && <span>New Season</span>}

          {/* main image */}
          {mainImageUrl ? (
            <img src={mainImageUrl} alt={title} className="mainImg" />
          ) : (
            <img
              src="fallback-image-path.jpg"
              alt="Fallback"
              className="mainImg"
            />
          )}

          {/* secondary image */}
          {secondImageUrl ? (
            <img src={secondImageUrl} alt={title} className="secondImg" />
          ) : null}
        </div>

        <h2>{title}</h2>

        <div className="prices">
          <h3>PKR {oldPrice ?? price + 500}</h3>
          <h3>PKR {price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
