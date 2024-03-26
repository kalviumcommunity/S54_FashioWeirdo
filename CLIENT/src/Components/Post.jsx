import React from "react";
import exampleimg1 from "./../assets/download-removebg-preview.png"


function Posts() {
  const data = [
    {
      title: 'Noah Cyrus',
      description: 'Noah Cyrus wore Schiaparelli Haute Couture to the 63RD Grammy Awards',
      image: exampleimg1, 
    },
  
  
  ];

  return (
    <div className="post-container">
      {data.map((item, index) => (
        <div key={index} className="post-item">
          <img src={item.image} alt={item.title} className="post-image" />
          <div className="post-content">
            <h2 className="post-title">{item.title}</h2>
            <p className="post-description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
