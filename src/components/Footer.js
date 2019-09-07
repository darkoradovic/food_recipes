import React from "react";
import logo from "../Assets/Images/LOGO.png";
import fb from "../Assets/Icons/FB.png";
import insta from "../Assets/Icons/INSTA.png";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer">
        <div className="row">
          <div className="col">
            <img src={logo} alt="..." className="logo-footer" style={{ width: '250px' }} />
          </div>
          <div className="col ">
            <a href="https://sr-rs.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="..." className="social" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="..." className="social" />
            </a>
          </div>
        </div>
        <div className=" footer-copyright text-center py-3">
          © Copyright-Golux Technologies 2019-Darko Radovic
      </div>
      </div>

    </React.Fragment>
  );
};

export default Footer;
