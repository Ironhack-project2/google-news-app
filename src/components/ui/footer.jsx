import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-center py-2 footer-container">
      <div className="container">
        <p className="mb-1">Website &copy; Mar & Mónica {currentYear}</p>
        <p className="mb-1">All other materials are copyrighted 
          by their respective holders.
        </p>
        <a
          href="https://github.com/Ironhack-project2/google-news-app"
          target="_blank"
          rel="noopener noreferrer"
          className="d-block"
        >
          GitHub repo for this site
        </a>
        <p className="mb-1">
          Powered by{" "}
          <a
            href="https://newsdatahub.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-block"
          >
            News Data Hub
          </a>
          ,{" "}
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-block"
          >
            News API
          </a>{" "}
          and{" "}
          <a
            href="https://apitube.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-block"
          >
            API Tube
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;