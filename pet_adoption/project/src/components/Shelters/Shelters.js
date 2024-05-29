import './Shelters.css';
// import { CookiesProvider, useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../constants';

function Shelters(props) {
    const [searchedShelters,setSearchedShelters] = useState([])
    const [searchBack,setSearchBack] = useState([]);
    const [shelters, setShelters] = useState([])
    const [info, setInfo] = useState({
        search: '',
        filter: '',
        sort: ''
    })

    function handleChange(event) {
        setInfo({ ...info, [event.target.name]: event.target.value });
    }
    function handleSearch(){
        if(info.search === ''){
            setShelters(searchBack)
        }
        if(info.filter === ''){
            info.filter = 'name'
        }
        if(info.filter === "name"){
            setSearchedShelters(searchBack.filter((shelter)=>
            shelter.name.includes(info.search)
        ))
        }
        else if(info.filter === "location"){
            setSearchedShelters(searchBack.filter((shelter)=>
            shelter.location.includes(info.search)
        ))
        }
    }
    useEffect(()=>{
        setShelters(searchedShelters)
    },[searchedShelters])

    useEffect(()=>{
        setShelters(searchBack)
    },[searchBack])
    
    function handleDelete(id){
        axios.delete(SERVER_URL + `/manager/deleteShelter/${id}`, {
            auth: {
                username: props.user.username,
                password: props.user.password
            }
        })
            .then(response => {
                alert(response.data)
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(()=>{
            console.log(props.user.username)
            console.log(props.user.password)
            axios.get(SERVER_URL + '/manager/getAllShelter', {
                auth: {
                    username: props.user.username,
                    password: props.user.password
                }
            })
                .then(response => {
                    setSearchBack(response.data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    },[])
    return (
        <div className='Mbody'>
            <div className='Mtotal'>
                <section className='Msec'>
                    <div className='MSearchbar'>
                        <div className='MSearchinput'>
                            <input className='Min11' placeholder='Search' name="search" id='search' type='text' required onChange={handleChange} />
                        </div>
                        <div className='Mfiltersort'>
                        <div className='Mfilter'>
                                <label className='Mlabel2'>Search By</label>
                                <select className='Min2 search-by' placeholder='Filter' id='filter' name="filter" required onChange={handleChange}>
                                    <option value="name" selected>Name</option>
                                    <option value="location">Location</option>
                                </select>
                            </div>
                            <div className='Msort'>
                                <label className='Mlabel2'>Sort By</label>
                                <select className='Min2' placeholder='Sort' id='sort' name="sort" required onChange={handleChange}>
                                    <option value="Name" selected>Name</option>
                                    <option value="Age">Location</option>
                                </select>
                            </div>
                            <button className='btn btn-dark shelter-search-btn' onClick={handleSearch}>Search/Filter</button>
                        </div>
                    </div>
                    <div className='container McardsSpace'>
                        <div className='Mcardsholder'>
                            {shelters.map((Shelter) => (
                            <div key={Shelter.id} className='AAcard'>
                                <div className='AAinfo'>
                                    <div className='AAinfoparts'>
                                    <label className='AAlabel'>Shelter Name:</label>
                                    <p className='AAp'>{Shelter.name}</p>
                                    </div>
                                    <div className='AAinfoparts'>
                                    <label className='AAlabel'>Location:</label>
                                    <p className='AAp'>{Shelter.location}</p>
                                    </div>
                                </div>
                                <div className='AALinkHolder'>
                                    <Link to={"/shelterprofile"} className='AAlink btn btn-dark'>View Shelter</Link>
                                </div>
                                    <button className='AAlink btn btn-danger' onClick={()=>{handleDelete(Shelter.id)}}>Delete shelter</button>
                            </div>
                            ))}

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Shelters;