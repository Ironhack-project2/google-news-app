import React from "react";
import {Route, Routes} from 'react-router-dom';
import Footer from "./components/footer/footer.jsx";
import Header from "./components/Header/header.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import { Home } from './pages';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="w-100">

          <Header />

        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home></Home>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;