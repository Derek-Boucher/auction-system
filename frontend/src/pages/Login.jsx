import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import "../styles/Login.css";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission and login process
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the login endpoint
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ token: data.token, ...data.user });
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}{" "}
      {/* Display error message if it exists */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            required // Mark the input as required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required // Mark the input as required
          />
        </div>
        <button type="submit">Login</button> {/* Submit the form */}
      </form>
    </div>
  );
};

export default Login;
