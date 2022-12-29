import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer fixed opacity-50 mt-5 bottom-0 footer-center p-1 bg-base-300 text-base-content">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </footer>
    </>
  );
};

export default Footer;
