import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../constants";
function SignUp2() {
  const [repass, setRepass] = useState("");
  const [info, setInfo] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    role : ""
  });
  function handleChange(event) {
      setInfo({ ...info, [event.target.name]: event.target.value });
  }
  function handleRepass(event) {
    setRepass(event.target.value);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password, repassword) => {
    if (password.length < 5) {
      return 0;
    }
    if (password !== repassword) {
      return 1;
    }
    return 2;
  };
  function validatePhone(phone) {
    if (!isNaN(phone)) {
      return true;
    }
    return false;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const isValidEmail = validateEmail(info.email);
    const isValidPassword = validatePassword(info.password, repass);
    const isValidPhone = validatePhone(info.phone);

    if (!isValidEmail) {
      document.getElementById("email").placeholder =
        "must contain @ and . as(kk@ll.dd)";
      document.getElementById("email").classList.add("SSvibrate"); // Add the vibrate class
      setTimeout(() => {
        document.getElementById("email").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
        document.getElementById("email").placeholder = "Email";
      }, 1000);
    }
    if (isValidPassword === 0) {
      document.getElementById("password").placeholder = "5 chars or more";
      document.getElementById("password").classList.add("SSvibrate"); // Add the vibrate class
      setTimeout(() => {
        document.getElementById("password").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
        document.getElementById("password").placeholder = "Password";
      }, 1000);
    } else if (isValidPassword === 1) {
      document.getElementById("Repassword").placeholder = "Not Matched";
      document.getElementById("Repassword").classList.add("SSvibrate"); // Add the vibrate class
      setTimeout(() => {
        document.getElementById("Repassword").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
        document.getElementById("Repassword").placeholder = "Re-Password";
      }, 1000);
    }
    if (!isValidPhone) {
      document.getElementById("phone").classList.add("SSvibrate"); // Add the vibrate class
      setTimeout(() => {
        document.getElementById("phone").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
      }, 1000);
    }
    if (
      isValidEmail &&
      isValidPassword === 2 &&
      isValidPhone
    ) {
      console.log(info);
      axios
        .post(SERVER_URL + "/register", info)
        .then((response) => {
          alert(response.data);
          window.location.href = "http://localhost:3000/";
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  }
  return (
    <div className="signup-body">
      <div className="SSgradient-form">
        <div className="SSall">
          <div className="form-container d-flex flex-column">
            <h2>Please fill the following information</h2>
            <form
              className="form"
              onSubmit={handleSubmit}
            >
                <input
                  className="signup-in"
                  placeholder="Name"
                  name="name"
                  id="name"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <input
                  className="signup-in"
                  placeholder="Username"
                  name="username"
                  id="username"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <input
                  className="signup-in"
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                />
                <input
                  className="signup-in"
                  placeholder="Re-Password"
                  id="Repassword"
                  type="password"
                  required
                  onChange={handleRepass}
                />
                <input
                  className="signup-in"
                  placeholder="Email"
                  name="email"
                  id="email"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <input
                  className="signup-in"
                  placeholder="Phone"
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={handleChange}
                />
                <div className="radio">
                  <label>
                    <input className="radioclass"
                      type="radio"
                      id="adopter"
                      value="USER"
                      name="role"
                      required
                      onChange={handleChange}
                    />{" "}
                    Adopter
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="staff"
                      value="STAFF"
                      name="role"
                      required
                      onChange={handleChange}
                    />{" "}
                    Staff
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="manager"
                      value="MANAGER"
                      name="role"
                      required
                      onChange={handleChange}
                    />{" "}
                    Manager
                  </label>
                  {info.staff === "staff" ?
                  (
                      <>
                        <select className='signup-in select mb-4' placeholder='Shelter'id='shelter'  name="shelter" required onChange={handleChange}>
                          <option value="" disabled selected>Shelter</option>
                          <option value="student">Student</option>
                          <option value="associate">Associate</option>
                          <option value="bachelor">Bachelor</option>
                          <option value="certificate">Certificate</option>
                          <option value="diploma">Diploma</option>
                          <option value="doctorate">Doctorate</option>
                          <option value="engineer">Engineer's Degree</option>
                          <option value="master">Master</option>
                          <option value="professional">Professional Degree</option>
                          <option value="specialist">Specialist Degree</option>
                          <option value="vocational">Vocational</option>
                        </select>
                      </>
                  ) : <></> 
                }
                </div>
                
              <button className="signup-register btn btn-light" type="submit">
                Register
              </button>
              <Link
                className="signup-back btn btn-primary"
                to={"/"}
              >
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp2;
