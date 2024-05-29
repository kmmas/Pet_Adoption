import './Application.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Application() {
    const [info, setInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: ''
    })
    function handleChange(event) {
        setInfo({ ...info, [event.target.name]: event.target.value })
    }
    return (
        <div className='Abody'>
            <div className='Atotal'>
                <section className='container Asec'>
                    <form action="/" method="post" className='Aff2' >
                        <h2>Please fill the application</h2>
                        <div className='Aflp'>
                            <label className='Alabel' for="">Username: </label>
                            <input className='Ain' placeholder='Username' name="username" id='username' type='text' required onChange={handleChange} />
                        </div>
                        <div className='Aflp'>
                            <label className='Alabel' for="">Name: </label>
                            <input className='Ain' placeholder='Name' name="name" id='name' type='text' required onChange={handleChange} />
                        </div>
                        <div className='Aflp'>
                            <label className='Alabel' for="">Phone: </label>
                            <input className='Ain' placeholder='Phone' id='phone' name='phone' type='text' required onChange={handleChange} />
                        </div>
                        <div className='Aflp'>
                            <label className='Alabel' for="">Gender: </label>
                            <select className='Ain' placeholder='Gender' id='gender' name="gender" required onChange={handleChange}>
                                <option value="student" selected>Male</option>
                                <option value="associate">Female</option>
                                <option value="bachelor">Other</option>
                            </select>
                        </div>
                        <button className='Abutt btn btn-dark' type='submit' >Submit</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Application;