import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const LoginForm = ({ setLoggedIn }) => {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/auth/login", creds)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        localStorage.removeItem("token");
      });
  };
  return (
    <div>
      <form>
        <h1>Log in here</h1>
        <div>
          <label htmlFor="username">username</label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            value={creds.username}
          ></input>
          <label htmlFor="password">password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={creds.password}
          ></input>

          <div>
            <button onClick={handleLogin}>Login</button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setLoggedIn(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
