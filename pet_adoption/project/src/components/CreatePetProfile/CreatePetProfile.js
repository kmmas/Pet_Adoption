import React, { useState } from "react";
import "./CreatePetProfile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../constants";

function CreatePetProfile(props) {
const [repass, setRepass] = useState("");
const [info, setInfo] = useState({
    id: '',
    name: '',
    age: 0,
    healthStatus: '',
    image: '',
    gender:'',
    breed:'',
    adopted:false,
    shelterId:'1',
    description:'',
    behavior:'',
    species: ''
});
function handleChange(event) {
    if (event.target.name === "adopter" && event.target.value === "staff") {
    setInfo({ ...info, [event.target.name]: true });
    } else if (
    event.target.name === "adopter" &&
    event.target.value === "adopter"
    ) {
    setInfo({ ...info, [event.target.name]: false });
    } else {
    setInfo({ ...info, [event.target.name]: event.target.value });
    }
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
function validateAge(birthdate) {
    var today = new Date();
    var selectedDate = new Date(birthdate);

    // Check if the entered date is a realistic past date
    if (selectedDate >= today) {
    return false;
    } else {
    return true;
    }
}
function validateSSN(SSN) {
    if (!isNaN(SSN) && SSN.length === 14) {
    return true;
    }
    return false;
}
function validatePhone(phone) {
    if (!isNaN(phone)) {
    return true;
    }
    return false;
}
function handleSubmit(e){
        e.preventDefault();
        console.log(props.user.username)
        console.log(props.user.password)
        console.log(info)
        axios.post(SERVER_URL + '/staff/addPet',info ,{
            auth: {
                username: props.user.username,
                password: props.user.password
            }
        })
            .then(response => {
                alert(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
}
return (
    <div className="create-pet-profile-body">
    <div className="SSgradient-form">
        <div className="SSall">
        <div className="create-pet-profile-form-container d-flex flex-column">
            <h2>CREATE PET PROFILE</h2>
            <form className="create-pet-profile-form" onSubmit={handleSubmit}>

                <input
                className="create-pet-profile-signup-in"
                placeholder="Pet Name"
                name="name"
                id="name"
                type="text"
                required
                onChange={handleChange}
                />
                <input
                className="create-pet-profile-signup-in"
                placeholder="Age"
                name="age"
                id="age"
                type="number"
                required
                onChange={handleChange}
                />
                <input
                className="create-pet-profile-signup-in"
                placeholder="HealthStatus"
                id="healthStatus"
                name="healthStatus"
                type="text"
                required
                onChange={handleChange}
                />
                <input
                className="create-pet-profile-signup-in"
                placeholder="Image"
                id="image"
                name="image"
                type="text"
                required
                onChange={handleChange}
                />
                <select className='create-pet-profile-signup-in' placeholder='Shelter'id='shelter'  name="gender" required onChange={handleChange}>
                        <option value="" disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>

                        <input
                className="create-pet-profile-signup-in"
                placeholder="Breed"
                id="breed"
                name="breed"
                type="text"
                required
                onChange={handleChange}
                />    
       <input
                className="create-pet-profile-signup-in"
                placeholder="Species"
                id="species"
                name="species"
                type="text"
                required
                onChange={handleChange}
                /> 
                <input
                className="create-pet-profile-signup-in"
                placeholder="Behaviors"
                id="behavior"
                name="behavior"
                type="text"
                onChange={handleChange}
                />
                <div className="create-pet-profile-radio">
                <textarea style={{width : "94%", height: "100px"}}
                placeholder='Description' name="description"
                className="create-pet-profile-signup-in"
                onChange={handleChange}/>
                </div>
                
            <button className="create-pet-profile-signup-register btn btn-light" type="submit" >
                Register
            </button>
            </form>
        </div>
        </div>
    </div>
    </div>
);
}

export default CreatePetProfile;
