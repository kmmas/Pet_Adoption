import './PetProfile.css'
// import axios from 'axios'
// import { SERVER_URL } from '../../constants'
// import { useCookies } from 'react-cookie'
import { useState } from "react"
import { useAuth, upload } from "../../firebase"
import { Link } from 'react-router-dom/dist'
const images = [
    {image : require("../../images/c2.jpg")},
    {image : require("../../images/c3.jpg")},
    {image : require("../../images/c4.jpg")},
]

// function getRole(page) {

//     if (page === 1) {
//         return "student"
//     } else {
//         return "instructor"
//     }
// }

const StudentProfile = (props) => {
    const currentUser = useAuth();
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState(require("../../images/dd.jpg"));

    function handleBrowse(event) {
        upload(event.target.files[0], currentUser, setLoading, setPhotoURL);
    }
    // const [studentData, setStudentData] = useState()

    // useEffect(() => {
    //     console.log(props.user.email)
    //     console.log(props.user.password)
    //     axios.get(SERVER_URL + '/profile', {
    //         auth: {
    //             username: props.user.email,
    //             password: props.user.password
    //         }
    //     })
    //         .then(response => {
    //             console.log(response.data)
    //             setStudentData(response.data)
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // },[]);
    return (
        <div className="all-profile">
                <div className="petprofile">
                    <div className="image-container">
                        <div className="profile">
                            <img id="profile" src={photoURL} alt='profile' className='profile-img' />
                            <input type="file" id="file-input" name="file-input" onChange={handleBrowse} />
                            <label disabled={loading} id="file-input-label" for="file-input">Edit profile picture</label>
                            <h2>{props.name}</h2>
                            <span className="user-status">{props.position}</span>
                            <span className="user-status">Bella</span>
                            <span className="user-about">Everyone has the right to an effective remedy by the competent national tribunals for acts violating the fundamental rights </span>
                        </div>
                        <div><Link to="/application" className="btn btn-light fill-app">Fill the application</Link></div>
                        <div><Link to="/updateprofile" className="btn btn-light edit-profile">Edit pet information</Link></div>
                    </div>
                    <div className='petinfo' id="pet-info" >
                        <section id='pet'>PET INFORMATION</section>
                        <div className='info-container'>
                            <ul>
                                <li >Name: <span>Bella</span></li>
                                <li >Species: <span>Alaskan Malamute</span></li>
                                <li >Breed: <span>Bedlington Terrier</span></li>
                                <li >Age: <span>1 year</span></li>
                                <li >Gender: <span>Female</span></li>
                                <li >Health status: <span>Good Health</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container pet-description">
                    <h2 className="description-h">DESCRIPTION</h2>
                    <p className="description-p">Alaskan Malamutes are one of the largest dog breeds, with males typically weighing between 85-100 pounds (38-45 kg) and females weighing slightly less. They have a well-muscled and sturdy build, with a deep chest, strong legs, and a plumed tail carried over their back. The head is broad, and the ears are triangular and erect, adding to their alert expression.</p>                    
                </div>
                <div className='images container'>
                {images.map((image) => (
                            <div>
                                <img src={image.image} alt='' />
                            </div>
                        ))}
                </div>
            </div>
    )
}
export default StudentProfile;
