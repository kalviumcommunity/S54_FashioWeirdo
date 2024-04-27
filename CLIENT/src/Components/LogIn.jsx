import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const LogIn = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["Username","userToken"]);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const formSubmitHandler = async (data) => {
    console.log("data: ", data);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_AUTH}/login`,data);
      console.log("Response", response.data)
      console.log(response.data.token)
      setCookie("Username", response.data.Username)
      setCookie("userToken",response.data.token)
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <div className="form">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {/* Username */}
          <label className="form-label">
            Username
            <input
              type="text"
              {...register("Username", {  // Change to "username"
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="form-input"
            />
            {errors.Username && ( // Change to "username"
              <p className="err">{errors.Username.message}</p>
            )}
          </label>

          {/* Password */}
          <label className="form-label">
            Password
            <input
              type={showPassword ? "text" : "Password"}
              {...register("Password", {  // Change to "password"
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

          {/* Checkbox to show/hide password */}
          <label className="label-flex">
          <h2 className="shpass">Show Password</h2>
          <input type="checkbox" className="checkbox"onClick={togglePasswordVisibility} />
             
          </label>

          {/* Submit button */}
          <div className="button-flex">
            <input type="submit" value="Log In" className="signup-btn" />
          </div>
          <Link to="/SignUp" className="account">
            Don't have an account?
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogIn;
