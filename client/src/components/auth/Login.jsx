import React from "react";
import { useState } from "react";
import { TOKEN_KEY } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = process.env.BASE_URL

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          let user = res.foundUser;
          // let { _id, firstname } = user
          console.log("Token received:", res.token, user);
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          setInvalid(true);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <input
          className="global-input"
          type="text"
          name="email"
          placeholder="Email address"
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        {invalid && <span className="warning">Invalid password</span>}
        <br />
        <button className="global-button" onClick={handleLogin}>
          Login
        </button>

        <div>
          Don't have an account? <Link to="register">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
