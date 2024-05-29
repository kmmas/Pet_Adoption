import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../constants";
import "./Login.css";
function Login({ onLogin }) {
  const [info, setInfo] = useState({
    username: '',
    password: '',
  });
  function handleChange(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }

  const validatePassword = (password) => {
    if (password.length < 5) {
      return false;
    }
    return true;
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const isValidPassword = validatePassword(info.password);
    if (!isValidPassword) {
      document.getElementById("password").classList.add("Lvibrate"); // Add the vibrate class
      setTimeout(() => {
        document.getElementById("password").classList.remove("Lvibrate"); // Remove the vibrate class after a short delay
      }, 1000);
    }
    if (isValidPassword) {
      console.log(info)
      
      axios
        .post(SERVER_URL + "/login", info)
        .then((response) => {
          onLogin({
            username: info.username,
            password: info.password,
            role: response.data
          });
          if(response.data.includes('ADMIN')){
            window.location.href = `http://localhost:3000/admin`;

          }else{
            window.location.href = `http://localhost:3000/homepage`;

          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
    // Do something with the login data, for example, log it to the console
    // You can add authentication logic here, such as sending the data to a server for validation.
  }

  return (
    <div className="Lbody">
      <div className="Lgradient-form">
        <div className="Lall">
          <div className="leftside d-flex flex-column ">
            <h2 className="login">Please login to your account</h2>

            <form action="#" className="Lff" onSubmit={handleSubmit}>
              <input
                className="Linp"
                placeholder="Username"
                id="username"
                type="text"
                name="username"
                required
                onChange={handleChange}
              />
              <input
                className="Linp"
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
              />

              <button className=" Lbut btn btn-light" type="submit">
                Sign in
              </button>
            </form>
            <div className="Lend">
              <p className="Ldont">Don't have an account?</p>

              <Link
                to={"/signup"}
                style={{ textDecoration: "none" }}
                className="Lbut2 btn btn-primary"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
