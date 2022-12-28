import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer fixed bottom-0 footer-center p-2 bg-base-300 text-base-content">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </footer>
    </>
  );
};

export default Footer;
