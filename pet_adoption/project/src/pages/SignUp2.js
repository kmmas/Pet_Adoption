import React, { useState } from 'react';
import './';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from 'react-router-dom';


function SignUp2() {
  const [info,setInfo] = useState({});


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password , repassword) => {
    if(password.length < 5){
      return 0;
    }
    if(password !== repassword){
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
    }else{
        return true
    }
  }
  function validateSSN(SSN) {
    if(!isNaN(SSN) && SSN.length === 14 ){
        return true
    }
    return false
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get form values by ID
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('Repassword').value;
    var birthdate = document.getElementById("birth").value;
    var ssn = document.getElementById("ssn").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var gender = document.getElementById("gender").value;
    var degree = document.getElementById("degree").value;
    var country = document.getElementById("country").value;

    var radio_input = document.querySelectorAll('input[name="radio-group"]');
    let Student_instructor = '';
    radio_input.forEach(input => {
      if (input.checked) {
        Student_instructor = input.value;
      }
    });
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password,repassword);
    const isValidBirth = validateAge(birthdate);
    const isValidSSN = validateSSN(ssn);

    if (!isValidEmail) {
        document.getElementById('email').value='';
        document.getElementById('email').placeholder="must contain @ and . as(kk@ll.dd)";
        document.getElementById('email').classList.add('SSvibrate'); // Add the vibrate class
        setTimeout(() => {
        document.getElementById('email').classList.remove('SSvibrate'); // Remove the vibrate class after a short delay
        document.getElementById('email').placeholder="Email";
        }, 1000);
      }
    if (isValidPassword === 0) {
    document.getElementById('password').value='';
    document.getElementById('password').placeholder="5 chars or more";
    document.getElementById('password').classList.add('SSvibrate'); // Add the vibrate class
    setTimeout(() => {
    document.getElementById('password').classList.remove('SSvibrate'); // Remove the vibrate class after a short delay
    document.getElementById('password').placeholder="Password";
    }, 1000);
    } 
    else if(isValidPassword === 1) {
    document.getElementById('Repassword').value='';
    document.getElementById('Repassword').placeholder="Not Matched";
    document.getElementById('Repassword').classList.add('SSvibrate'); // Add the vibrate class
    setTimeout(() => {
    document.getElementById('Repassword').classList.remove('SSvibrate'); // Remove the vibrate class after a short delay
    document.getElementById('Repassword').placeholder="Re-Password";
    }, 1000);
    }
    if (!isValidSSN) {
        document.getElementById('ssn').value='';
        document.getElementById('ssn').classList.add('SSvibrate'); // Add the vibrate class
        setTimeout(() => {
        document.getElementById('ssn').classList.remove('SSvibrate'); // Remove the vibrate class after a short delay
        }, 1000);
      }
    if (!isValidBirth) {
        document.getElementById('birth').value='';
        document.getElementById('birth').classList.add('SSvibrate'); // Add the vibrate class
        setTimeout(() => {
        document.getElementById('birth').classList.remove('SSvibrate'); // Remove the vibrate class after a short delay
        }, 1000);
      }
    if(isValidEmail && isValidPassword === 2 && isValidSSN && isValidBirth){
    const name = fname + " " + lname
    console.log('Sign up Data:', { email, password,ssn,birthdate,name, Student_instructor,degree,gender,country });
    }
    // Do something with the login data, for example, log it to the console
    // You can add authentication logic here, such as sending the data to a server for validation.
  };
  return (
    <div className='SSbody'>
      <div className="SSgradient-form">

      <div className='SSall'>

        <div  className="SSleftside d-flex flex-column ">
            <div className="SShead">
                <h5>Please fill the following information</h5>
            </div>
            <form action="/Login.js" method="post" className='Sff2' onSubmit={handleSubmit}>
{/*  ************************************* for email *************************** */}
                <div className='Sflp'>
                    <input className='Sin' name="email" placeholder='Email'  id='email' type='text' required/>
                </div>
{/*  ************************************* for first name & last name *************************** */}
                <div className='Sflp'>
                  <input className='Sin2' name="firstName" placeholder='FirstName'  id='fname' type='text'required/>
                  <input className='Sin2' name="lastName" placeholder='LastName'  id='lname' type='text'required/>
                </div>
{/*  ************************************* for password *************************** */}
                <div className='Sflp'>
                  <input className='Sin2' name="password" placeholder='Password'id='password' type='password'required/>
                  <input className='Sin2' placeholder='Re-Password'id='Repassword' type='password'required/>
                </div>
{/*  ************************************* for gender *************************** */}
                <div className='Sflp'>
                    <select className='Sin2' name="gender" id="gender" name="genderSelect">
                        <option value="" disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input className='Sin2' type="date" id="birth" placeholder='Birthdate' name="birthdateInput" max="2030-12-31" required/>
                </div>
{/*  ************************************* for degree *************************** */}
                <div className='Sflp'>
                    <input className='Sin2' placeholder='SSN'id='ssn' type='text'required/>
                    <select className='Sin2' placeholder='Degree'id='degree' name="degreeSelect" required>
                      <option value="" disabled selected>Degree</option>
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
                </div>
{/*  ************************************* for country *************************** */}
                <div  className='Sflp'>
                    <select className='Sin2' id="country" name="country" required>
                        <option value="" disabled selected>Country</option>
                        <option value="saudi_arabia">Saudi Arabia</option>
                        <option value="egypt">Egypt</option>
                        <option value="iraq">Iraq</option>
                        <option value="sudan">Sudan</option>
                        <option value="algeria">Algeria</option>
                        <option value="morocco">Morocco</option>
                        <option value="yemen">Yemen</option>
                        <option value="syria">Syria</option>
                        <option value="tunisia">Tunisia</option>
                        <option value="jordan">Jordan</option>
                        <option value="libya">Libya</option>
                        <option value="lebanon">Lebanon</option>
                        <option value="kuwait">Kuwait</option>
                        <option value="uae">United Arab Emirates</option>
                        <option value="qatar">Qatar</option>
                        <option value="bahrain">Bahrain</option>
                        <option value="om">Oman</option>
                        <option value="mauritania">Mauritania</option>
                        <option value="djibouti">Djibouti</option>
                        <option value="comoros">Comoros</option>
                    </select>                     
                    <input className='Sin2' placeholder='City'id='City' type='text'/>
                </div>
{/*  ************************************* for student or instructor *************************** */}
                <div  className='Sflp2'>
                  <label ><input type='radio'  id='student' value="student" name="radio-group" required/> Student</label>
                  <label ><input type='radio' id='instructor' value="instructor" name="radio-group" required/> Instructor</label>
                </div>
{/*  ************************************* submit *************************** */}
                <button className='Sbutt' type='submit' >Register</button>
            </form>
        </div>

        <div className="SSrightside">

            <div className="SSfirst">
                <img className='SSLOGO' src={require('./e-learn.jpg')} alt='logo'/>
                <h1>Sign Up</h1>
            </div>
            <div className="SSSecond">
                <h5>Welcome to Our E-Learning Platform! 🚀</h5>
                <p>Unlock limitless learning possibilities with us. Sign up now and embark on a journey of knowledge and growth! 📚✨</p>
                <Link className="SSback" to={"/"}>Go Back</Link>
            </div>
        </div>

      </div>

    </div>
    </div>

  );
}

export default SignUp2;