import { SERVER_URL } from '../../constants';
import './Admin.css'
import axios from 'axios';
import {useState, useEffect } from 'react';
const Admin = (props) => {
    const [info, setInfo] = useState({
        username: '',
        password: '',
      });
      function handleChange(event) {
        setInfo({ ...info, [event.target.name]: event.target.value });
      }
    function handleBackup(){
        console.log(props.user.username)
        console.log(props.user.password)
        axios.get(SERVER_URL + '/admin/backup',{
            auth : {
                username: props.user.username,
                password: props.user.password
            }
        })
        .then(response => {
            alert(response.data)
        })
        .catch(error => {
            alert(error.response.data)
        });
    }
    function handleRestore(){
        axios.get(SERVER_URL + '/admin/restore',{
            auth : {
                username: props.user.username,
                password: props.user.password
            }
        })
            .then(response => {
                alert(response)
            })
            .catch(error => {
                alert(error.response.data)
            });
    }
    function handleAdmin(){
        axios.post(SERVER_URL + '/admin/restore',info,{
            auth : {
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
        <>
            {(props.user && (props.user.role.includes("ADMIN") )) ?
                (
                    <div className='container admin-btns'>
                        <button className='btn btn-dark' onClick={handleBackup}>Backup</button>
                        <button className='btn btn-dark'onClick={handleRestore}>Restore</button>
                        <button className='btn btn-dark'onClick={handleAdmin}>create Admin</button>
                        <input type="text" name="username" value="" onChange={handleChange}/>
                        <input type="text" name="password" value="" onChange={handleChange}/>

                    </div>
                    
                ) :
                <h1 className='container admin-page'>You are not authorized to open this page. Please login to open this page</h1>
            }
        </>


    );
};
export default Admin;
