import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Post from "./Components/Post";
import About from "./Components/About";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
