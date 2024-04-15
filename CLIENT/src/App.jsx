import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Post from "./Components/Post";
import About from "./Components/About";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import EntityForm from "./Components/EntityForm";
import UpdateForm from "./Components/UpdateForm"

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/EntityForm" element={<EntityForm/>}/>
        <Route path="/UpdateForm/:id" element={<UpdateForm />}/>
      </Routes>
    </>
  );
}

export default App;
