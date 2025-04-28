import React from "react";
import "./Newsletter.scss";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h2>Newsletter!</h2>
      <p>Subscribe to get the latest updates, offers, and exclusive deals.</p>
      <form className="newsletter-form">
        <input type="email" placeholder="Enter your email!" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default Newsletter;
