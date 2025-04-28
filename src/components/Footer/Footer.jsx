import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Born from passion, built for you. We craft quality experiences—one
            product at a time.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Questions? Ideas? We’re all ears. Reach out—we’d love to connect!
            Waiting for you at dome@gmail.com.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">DOME</span>
          <span className="copyright">
            © Copyright 2025. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
