import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Remove retypePassword from data
      const { retypePassword, ...postData } = {
        Email: data.Email,
        Password: data.Password,
        Name: data.Name,
        Username: data.Username
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_AUTH}/`,
        postData
      );

      // Display success message if user was successfully created
      toast.success("Registration Successful! Please Log In.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/LogIn");
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "User already exists!"
      ) {
        // Prompt the user to change username
        toast.error(
          "Username already exists. Please choose a different username.",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } else {
        toast.error("Error signing up. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          {/* Name */}
          <label className="form-label">
            Name
            <input
              type="text"
              {...register("Name", {
                required: "Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters",
                },
              })}
              className="form-input"
            />
            {errors.Name && (
              <p className="err">{errors.Name.message}</p>
            )}
          </label>

          {/* Username */}
          <label className="form-label">
            Username
            <input
              type="text"
              {...register("Username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="form-input"
            />
            {errors.Username && (
              <p className="err">{errors.Username.message}</p>
            )}
          </label>

          {/* Password */}
          <label className="form-label">
            Password
            <input
              type={showPassword ? "text" : "password"}
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="form-input"
            />
            {errors.Password && (
              <p className="err">{errors.Password.message}</p>
            )}
          </label>

          {/* Retype Password */}
          <label className="form-label">
            Retype Password
            <input
              type={showPassword ? "text" : "password"}
              {...register("retypePassword", {
                required: "Please retype your password",
                validate: (value) =>
                  value === watch("Password") || "Passwords do not match",
              })}
              className="form-input"
            />
            {errors.retypePassword && (
              <p className="err">{errors.retypePassword.message}</p>
            )}
          </label>

          {/* Show Password Checkbox */}
          <label className="label-flex">
            <h2 className="shpass">Show Password</h2>
            <input type="checkbox" className="checkbox" onClick={togglePasswordVisibility} />
          </label>

          {/* Email */}
          <label className="form-label">
            <br />
            Email
            <input
              type="email"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="form-input"
              placeholder="Enter your email address"
            />
            {errors.Email && (
              <p className="err">{errors.Email.message}</p>
            )}
          </label>

          <div className="button-flex">
            <input type="submit" value="Sign Up" className="signup-btn" />
          </div>
          <Link to="/LogIn" className="account">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
