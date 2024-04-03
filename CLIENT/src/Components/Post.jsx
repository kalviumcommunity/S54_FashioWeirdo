import React, { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  async function fetchData() {
    const response = await axios.get("http://localhost:3000/main");
    setData(response.data);
  }

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="post-container">
      {data.map((item, index) => (
        <div key={index} className="post-item" onClick={() => handleItemClick(item)}>
          <img src={item.image} alt={item.title} className="post-image" />
          <h2 className="post-title">{item.name}</h2>
          {selectedItem && selectedItem.title === item.title && (
            <div className="post-description">
              <p>{item.description}</p>
            </div>
          )}
        </div>
      ))}
      {selectedItem && (
        <div className="modal active">
          <div className="modal-content">
          <div className="close-btn">
            <span className="close" onClick={handleCloseModal}>&times;</span>
          </div>
            <img src={selectedItem.image} alt={selectedItem.title} className="modal-image" />
  
              <h2 className="modal-title">{selectedItem.name}</h2>
              <p className="modal-region">{selectedItem.region}</p>
              <p className="modal-description">{selectedItem.description}</p>
            </div>
          </div>
      )}
    </div>
  );
}

export default Posts;

