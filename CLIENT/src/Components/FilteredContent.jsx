import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function FilteredContent() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_AUTH);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const filtered = data.filter((item) => item.Username === selectedUser);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedUser, data]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      toast.success("Post Deleted Successfully");
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Error deleting post. Please try again.");
    }
  };

  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <>
    
      <div className="body">
        <br />
        <div className="filter-options">
            <div>
          <select value={selectedUser} onChange={handleChange} className="select">
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.Username}>
                {user.Username}
              </option>
            ))}
          </select>
          </div>
          <br />
        </div>
        <div className="post-container">
          {error && <p className="error-message">{error}</p>}
          {filteredData.map((item, index) => (
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
                  <span
                    className="close"
                    onClick={() => setSelectedItem(null)}
                  >
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
                <p className="modal-description">
                  {selectedItem.description}
                </p>
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

export default FilteredContent;
