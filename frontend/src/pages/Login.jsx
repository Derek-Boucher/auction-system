import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js"; // Import the UserContext to access and update user state
import "../styles/Login.css"; // Import CSS for styling

const Login = () => {
  const { setUser } = useContext(UserContext); // Extract setUser function from context to update the user state
  const [email, setEmail] = useState(""); // State to store the user's email input
  const [password, setPassword] = useState(""); // State to store the user's password input
  const [error, setError] = useState(""); // State to store any login error messages
  const navigate = useNavigate(); // Hook to navigate programmatically after successful login

  // Function to handle form submission and login process
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Send a POST request to the login endpoint
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that we're sending JSON data
        },
        body: JSON.stringify({ email, password }), // Convert email and password to JSON for the request body
      });

      const data = await response.json(); // Parse the response as JSON
      console.log("Data:", data); // Log the response data for debugging

      if (response.ok) {
        // If login is successful, update the user state with token and user info
        setUser({ token: data.token, ...data.user }); // Store token and user info in context
        navigate("/"); // Redirect the user to the homepage or another target page
      } else {
        // If login fails, display an error message
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
