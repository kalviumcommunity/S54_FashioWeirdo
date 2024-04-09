import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function EntityForm() {
    const { register, handleSubmit } = useForm();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const postData = async () => {
            try {
                if (formData) {
                    await axios.post(import.meta.env.VITE_API_URL, formData);
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
                        <input type="text" {...register("name", { required: true })} className="namef" /> <br />
                    </label>
                    <label className="image-form">
                        Image URL:
                        <input type="text" {...register("image", { required: true })} className="imagef" /> <br />
                    </label>
                    <label className="region-form">
                        Region:
                        <input type="text" {...register("region", { required: true })} className="regionf" /> <br />
                    </label>
                    <label className="description">
                        Description:
                        <input type="text" {...register("description", { required: true })} className="descript" /> <br />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EntityForm;
