import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register.js";
import HomePage from "./HomePage.js"; // Import the HomePage component
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
    
        <Routes>
          <Route path="/" element={<Register />} />
       
          <Route path="/home" element={<HomePage />} /> 
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
