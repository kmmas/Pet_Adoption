import React from 'react'
import './StaffProfile.css'
import { useState,useEffect } from "react"
import { useAuth, upload } from "../../firebase"
import axios from 'axios'
import { SERVER_URL } from '../../constants'
import { Link } from 'react-router-dom'
const StaffProfile = (props) => {
    const currentUser = useAuth();
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://cdn.vectorstock.com/i/preview-1x/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp");

    function handleBrowse(event) {
        upload(event.target.files[0], currentUser, setLoading, setPhotoURL);
    }
    const [studentData, setStudentData] = useState()

    useEffect(() => {
        console.log(props.user.username)
        console.log(props.user.password)
        axios.get(SERVER_URL + '/profile', {
            auth: {
                username: props.user.username,
                password: props.user.password
            }
        })
            .then(response => {
                console.log(response.data)
                setStudentData(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);

    return (
        <>
            <div className="all-staff">
                <div className="image-container-staff">
                    <div className="profile-staff">
                        <img id="profile" src={photoURL} alt='profile' className='profile-img' />
                        <input type="file" id="file-input" name="file-input" onChange={handleBrowse} />
                        <label disabled={loading} id="file-input-label-staff" for="file-input">Edit profile picture</label>
                        <h2>{props.name}</h2>
                        <span className="user-status-staff">{props.user.role}</span>
                        <span className="user-about-staff">Everyone has the right to an effective remedy by the competent national tribunals for acts violating the fundamental rights </span>
                    </div>
                    <div><button to="/updateprofile" className="btn btn-light edit-profile-staff">Edit Profile</button></div>
                </div>
                <div className="intro-staff">
                    <h1 id="header1-staff">Pet Adoption Website</h1>
                    <h3 id="header2-staff">The Best For You</h3>
                    <span className="intro-discription-staff">Welcome to our heartwarming community of furry friends seeking forever homes! Our pet adoption website is a haven for animal lovers, connecting compassionate individuals with adorable pets in need. Browse through our profiles, filled with wagging tails and purring companions, and embark on the journey to find your perfect match. Every adoption not only changes the life of a pet but also enriches yours with love and companionship. Begin your adventure in creating lasting memories with a new four-legged friend today!</span>
                    <div className="buttons-staff">
                        {props.user.role == "STAFF" ?
                            (<div className="button-staff"><Link to="/createpetprofile" className="btn btn-light ">Create Pet</Link></div>)
                            :
                            <></>
                        }   
                        {props.user.role != "MANAGER" ?
                            (<div className="button-staff"><Link to="/pets" className="btn btn-light ">View Available Pets</Link></div>)
                            :
                            (<><div className="button-staff"><Link to="/createshelter" className="btn btn-light ">Create Shelter</Link></div><div className="button-staff"><Link to="/shelters" className="btn btn-light ">View Available Shelters</Link></div></>)
                        }
                    </div>
                </div>
            </div>
            <div className='staff-info-container container'>
            <div className='staffinfo' id="staff-info" >
                <section id='staff'>{props.user.role} INFORMATION</section>
                <div className='staff-info-container'>
                    <ul>
                        <li >Name: <span>{studentData?.name}</span></li>
                        <li >Email: <span>{studentData?.email}</span></li>
                        <li >Phone: <span>{studentData?.phone}</span></li>
                        <li >Shelter associated with: <span>Mahmoudya</span></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}
export default StaffProfile;
