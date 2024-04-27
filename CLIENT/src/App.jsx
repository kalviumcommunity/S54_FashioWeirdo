import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Post from "./Components/Post";
import About from "./Components/About";
import LogIn from "./Components/LogIn";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import EntityForm from "./Components/EntityForm";
import UpdateForm from "./Components/UpdateForm"
import FilteredContent from "./Components/FilteredContent";
function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/EntityForm" element={<EntityForm/>}/>
        <Route path="/UpdateForm/:id" element={<UpdateForm />}/>
        <Route path="/LogIn" element={<LogIn/>}/>
        <Route path="/Filter" element={<FilteredContent/>}/>
      </Routes>
    </>
  );
}

export default App;
