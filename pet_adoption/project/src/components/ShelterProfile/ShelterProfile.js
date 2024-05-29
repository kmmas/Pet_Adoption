import './ShelterProfile.css';
// import { CookiesProvider, useCookies } from "react-cookie";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function ShelterProfile() {
    const [info, setInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: ''
    })
    const members = [
            { name  : 'Khaled Mohamed'},
            { name  : 'Mohamed Aly'},
            { name  : 'Abdelrahman Ramadan'},
            { name  : 'Mohamed EL Nady'},
            { name  : 'Leonal Messi'},
            { name  : 'Cristiano Ronaldo'},
            { name  : 'Khaled Mohamed'},
            { name  : 'Mohamed Aly'},
            { name  : 'Abdelrahman Ramadan'},
            { name  : 'Mohamed EL Nady'},
            { name  : 'Leonal Messi'},
            { name  : 'Cristiano Ronaldo'},
            { name  : 'Khaled Mohamed'},
            { name  : 'Mohamed Aly'},
            { name  : 'Abdelrahman Ramadan'},
            { name  : 'Mohamed EL Nady'},
            { name  : 'Leonal Messi'},
            { name  : 'Cristiano Ronaldo'},
            { name  : 'Khaled Mohamed'},
            { name  : 'Mohamed Aly'},
            { name  : 'Abdelrahman Ramadan'},
            { name  : 'Mohamed EL Nady'},
            { name  : 'Leonal Messi'},
            { name  : 'Cristiano Ronaldo'},
    ]
    const details = {
            name : 'Bablicano',
            location: 'Smoha,Alexandria,Egypt',
            phonenumber: '01555226623',
            landline: '034812812',
            gmail: 'khaledmohamad362@gmail.com',
            face: 'PetAdoptaion page'
        }

    function handleChange(event) {
        setInfo({ ...info, [event.target.name]: event.target.value })
    }
    return (
        <div className='Sbody'>
            <div className='Stotal'>
                <section className='Ssec'>
                        <div className='Scardsholder'>
                            <div className='Sdetails'>
                                <div className='Sdetailparts'>
                                    <label className='Slabel Sadd' for="">Shelter Name:</label>
                                    <p className='Sp'>{details.name}</p>
                                </div>
                                <div className='Sdetailparts'>
                                    <label className='Slabel Sadd' for="">Shelter Location:</label>
                                    <p className='Sp'>{details.location}</p>
                                </div>   
                                <div className='Sdetailparts2'>
                                    <label className='Slabel Sadd' for="">Contact Information:</label>
                                    <div className='Sphone'>
                                        <label className='Slabel2 Sadd2'>Phone Number:</label>
                                        <p className='Sp'>{details.phonenumber}</p>
                                    </div>
                                    <div className='Sphone'>
                                        <label className='Slabel2 Sadd2' >Landline:</label>
                                        <p className='Sp'>{details.landline}</p>
                                    </div>
                                    <div className='Sphone'>
                                        <label className='Slabel2 Sadd2' >Gmail:</label>
                                        <p className='Sp'>{details.gmail}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='Scard'>
                                <div className='Sinfo'>
                                    <label className='Slabel'>Staff Members:</label>
                                    <div className='Smembers'>
                                    {members.map((member) => (
                                    <div className='Sinfoparts'>
                                    <label className='Slabel2'>Name:</label>
                                    <p className='Mp'>{member.name}</p>
                                    </div>
                                    ))}
                                    </div>
                                </div>
                            </div>


                        </div>
                </section>
            </div>
        </div>
    );
}

export default ShelterProfile;