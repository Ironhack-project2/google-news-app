import React from "react";
import Footer from "./components/footer/footer.jsx";
import Header from "./components/Header/header.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="w-100">
          <Header />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;