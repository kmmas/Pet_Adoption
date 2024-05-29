import React, { useState } from "react";
import "./CreateShelter.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../constants";
function CreateShelter(props) {
  const [repass, setRepass] = useState("");
  const [info, setInfo] = useState({
    name: "",
    location: "",
    email: "",
    phone: ""
  });
  function handleChange(event) {
      setInfo({ ...info, [event.target.name]: event.target.value });
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function validatePhone(phone) {
    if (!isNaN(phone)) {
      return true;
    }
    return false;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const isValidEmail = validateEmail(info.email);
    const isValidPhone = validatePhone(info.phone);
    console.log(document.getElementById("email"))
    if (!isValidEmail) {
      document.getElementById("email").placeholder ="must contain @ and . as(kk@ll.dd)";
      document.getElementById("email").classList.add("SSvibrate"); // Add the vibrate class
      setTimeout(() => {
        document.getElementById("email").classList.remove("SSvibrate"); // Remove the vibrate class after a short delay
        document.getElementById("email").placeholder = "Email";
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
      isValidPhone
    ) {
      console.log(props.user.username);
      console.log(props.user.role)
      axios
        .post(SERVER_URL + "/manager/createShelter", info,{
          auth:{
            username : props.user.username,
            password : props.user.password
          }
          
        })
        .then((response) => {
          alert(response.data);
          // window.location.href = "http://localhost:3000/";
        })
        .catch((err) => {
          alert("Not authorized to create a shelter");
        });
    }
  }
  return (
    <div className="SSbody">
      <div className="SSgradient-form">
        <div className="SSall">
          <div className="SSleftside d-flex flex-column">
            <h1>Create Shelter</h1>
            <form
              className="Sff2"
              onSubmit={handleSubmit}
            >
                <input
                  className="Sin1"
                  placeholder="Shelter name"
                  name="name"
                  id="name"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <input
                  className="Sin1"
                  placeholder="Location"
                  name="location"
                  id="location"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <input
                  className="Sin1"
                  placeholder="Manager email"
                  name="email"
                  id="email"
                  type="text"
                  required
                  onChange={handleChange}
                />
                <input
                  className="Sin1"
                  placeholder="Manager phone"
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={handleChange}
                />
                
              <button className="Sbutt btn btn-light" type="submit">
                Create shelter
              </button>
              <Link to="/createpetprofile"
                className="SSback btn btn-primary"
              >
                Register a pet
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateShelter;
