import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../../constants";
const BASE_URL = process.env.BASE_URL

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState(""); // State for admin code input
  const [isAdmin, setIsAdmin] = useState(false); // State for "isAdmin" status
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const nav = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const requestBody = {
      firstname,
      lastname,
      email,
      password,
      adminCode, // Include isAdmin status in the request body
    };

    fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((res) => {
        setRegistrationSuccess(true);
        let user = res.newUser;
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem("user", JSON.stringify(user));
        // Redirect or perform any other action after successful registration
        setTimeout(() => {
          // Perform navigation after 3 seconds
          nav("/"); // Navigate to the home page
        }, 3000); // 3 seconds delay
      })
      .catch((err) => console.log(err.message));
  };

  // Function to handle admin code input change
  const handleAdminCodeChange = (e) => {
    const enteredCode = e.target.value.trim(); // Trim whitespace from entered code
    setAdminCode(enteredCode);
    if (enteredCode === "0524") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    console.log(typeof enteredCode, enteredCode);
    console.log(isAdmin);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h3>Register</h3>
        {registrationSuccess && (
          <p className="success-message">Registration Successful!</p>
        )}
        <form onSubmit={handleRegister}>
          <input
            className="global-input"
            type="text"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <br />
          <input
            className="global-input"
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <br />
          <input
            className="global-input"
            type="text"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <input
            className="global-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          {/* Admin code box */}
          <input
            className="global-input"
            type="password"
            name="adminCode"
            placeholder="Admin Code"
            value={adminCode}
            onChange={handleAdminCodeChange} // Call handleAdminCodeChange on change
            style={{ border: isAdmin ? "2px solid green" : "" }} // Change border color if admin code is correct
          />
          {isAdmin && <p style={{ color: "green" }}>Admin code accepted</p>}{" "}
          {/* Show message if admin code is correct */}
          <br />
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <div>
          Already have an account? <Link to="/users">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
