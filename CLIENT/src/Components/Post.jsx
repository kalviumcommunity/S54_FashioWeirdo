import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Posts() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL); // Adjust the API route accordingly
        setData(response.data);
        setError(null); // Reset error state if successful
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again."); // Set error message
      }
    }
    fetchData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation(); // Stop the event from bubbling up
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`); // Adjust the API route accordingly
      setData(data.filter((item) => item._id !== id)); // Remove the deleted item from the data array
      toast.success("Post Deleted Successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting post. Please try again.");
    }
  };

  return (
    <>
      <div className="buttonalign">
        <div>
          <Link to="/EntityForm">
            <button className="button">Post</button>
          </Link>
        </div>
      </div>
      <div className="body">
        <br />
        <div className="post-container">
          {error && <p className="error-message">{error}</p>}
          {data.map((item, index) => (
            <div
              key={index}
              className="post-item"
              onClick={() => handleItemClick(item)}
            >
              <img src={item.image} alt={item.title} className="post-image" />
              <h2 className="post-title">{item.name}</h2>
              {selectedItem && selectedItem._id === item._id && (
                <div className="post-description">
                  <p>{item.description}</p>
                </div>
              )}
              {/* Delete button */}
              <button
                onClick={(event) => handleDelete(item._id, event)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
          {selectedItem && (
            <div className="modal active">
              <div className="modal-content">
                <div className="close-btn">
                  <span className="close" onClick={() => setSelectedItem(null)}>
                    &times;
                  </span>
                </div>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="modal-image"
                />
                <h2 className="modal-title">{selectedItem.name}</h2>
                <p className="modal-region">{selectedItem.region}</p>
                <p className="modal-description">{selectedItem.description}</p>
                <Link to={`/UpdateForm/${selectedItem._id}`}>
                  <button className="update">Update</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Posts;
