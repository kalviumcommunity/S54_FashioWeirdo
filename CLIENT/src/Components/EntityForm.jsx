import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

function EntityForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const postData = async () => {
            try {
                if (formData) {
                    await axios.post(import.meta.env.VITE_API_URL, formData);
                    
                    toast.success("Form submitted successfully!");
                }
            } catch (error) {
                console.log("Error adding entity", error);
            }
        };

        postData();
    }, [formData]);

    const onSubmit = (data) => {
        setFormData(data);
    };

    return (
        <div className="align">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="forms">
                    <label className="nameform">
                        Name:
                        <input type="text" {...register("name", { required: "Name is required" })} className="namef" /> <br />
                        {errors.name && <p className="error-msg">{errors.name.message}</p>}
                    </label>
                    <label className="image-form">
                        Image URL:
                        <input type="text" {...register("image", { required: "Image URL is required" })} className="imagef" /> <br />
                        {errors.image && <p className="error-msg">{errors.image.message}</p>}
                    </label>
                    <label className="region-form">
                        Region:
                        <input type="text" {...register("region", { required: "Region is required" })} className="regionf" /> <br />
                        {errors.region && <p className="error-msg">{errors.region.message}</p>}
                    </label>
                    <label className="description">
                        Description:
                        <input type="text" {...register("description", { required: "Description is required" })} className="descript" /> <br />
                        {errors.description && <p className="error-msg">{errors.description.message}</p>}
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer /> 
        </div>
    );
}

export default EntityForm;