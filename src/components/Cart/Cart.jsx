// import React from "react";

// const Cart = () => {
//   return <div>cat</div>;
// };

// export default Cart;

import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_51R0XQOIyeVoAotlUwAPx4kZ9l8Zmm3nYYRQlJr9oMKjBIAZeQTrmyVcWA5ukutm6p3B93szHD2CMsJ2bA0DDfTwu00M7dIoGWt"
  );
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      {
        locale: "en"; // Explicitly set locale
      }
      const res = await makeRequest.post("/orders", {
        products,
      });
      console.log("res", res);
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("end data", products);
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img
            src={import.meta.env.VITE_APP_UPLOAD_URL + item?.img?.url}
            alt=""
          />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
