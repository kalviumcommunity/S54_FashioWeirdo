import React from "react";
import img from "../assets/Screenshot 2024-03-08 122657.png";

function Home() {
  return (
    <div className="home">
      <div className="body">
        {/* <img src={img} alt="" className="img" /> */}
        <div className="home-content">
          <h1 className="heading">Welcome to FashioWeirdo!</h1>
          <p className="des">Step into a world where fashion knows no bounds and eccentricity reigns supreme. Join us on a whimsical journey through the closets of the stars, where every outfit tells a story.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
