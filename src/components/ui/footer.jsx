import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">
          Website &copy; Mar & Monica {currentYear}
        </p>
        <p className="mb-1">
          All other materials are copyrighted 
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
        <a 
          href="https://newsdatahub.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="d-block"
        >
          Powered by News Data Hub
        </a>
      </div>
    </footer>
  );
};

export default Footer;