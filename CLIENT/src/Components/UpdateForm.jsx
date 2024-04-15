import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

function UpdateForm() {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
        setFormData(response.data.OneData);
        console.log(formData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, formData);
      
      console.log(formData)
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      
    }
  };

  return (
    <div className="align">
        <div className="update-form">
            <h2>Update Form</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} />
                    <label htmlFor="region">Region:</label>
                    <input type="text" id="region" name="region" value={formData.region || ''} onChange={handleChange} />
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" value={formData.image || ''} onChange={handleChange} />
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} />
                    <button type="submit">Update</button>
                </form>
            <ToastContainer /> 
        </div>
    </div>
  );
}

export default UpdateForm;

