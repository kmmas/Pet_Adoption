import './Pets.css';
// import { CookiesProvider, useCookies } from "react-cookie";
import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../constants';
function Pets(props) {
    var image = require("../../images/dd.jpg")
    const [info, setInfo] = useState({
        search: '',
        filter: '',
        sort: ''
    })
    const [searchedpets,setSearchedpets] = useState([])
    const [searchBack,setSearchBack] = useState([]);
    const [pets, setpets] = useState([])
    // function getimg(image){
    //     var output = require("${image}");
    //     return output
    // }
    function handleChange(event) {
        setInfo({ ...info, [event.target.name]: event.target.value });
    }
    function handleSearch(){
        console.log(info.filter)
        if(info.filter === ''){
            info.filter = 'species';
        }
        if(info.search === ''){
            console.log("here1")
            setpets(searchBack)
        }
        else if(info.filter === "name"){
            console.log("here2")
            console.log(searchedpets.length)
            console.log(searchBack.length)
            setSearchedpets(searchBack.filter((pet)=>
            pet.name.includes(info.search)
        ))
        console.log(searchedpets.length)

        }
        else if(info.filter === "species"){
            console.log("here3")
            console.log(searchedpets.length)
            console.log(searchBack.length)
            setSearchedpets(searchBack.filter((pet)=>
            pet.species.includes(info.search)

        ))
        console.log(searchedpets.length)
        }
        else if(info.filter === "age"){
            console.log("here4")

            setSearchedpets(searchBack.filter((pet)=>
            pet.age.includes(info.search)
        ))
        }
        else if(info.filter === "breed"){
            console.log("here5")

            setSearchedpets(searchBack.filter((pet)=>
            pet.breed.includes(info.search)
        ))
        }
        else if(info.filter === "gender"){
            console.log("here6")

            setSearchedpets(searchBack.filter((pet)=>
            pet.gender.includes(info.search)
        ))
        }
    }
    useEffect(()=>{
        setpets(searchedpets)
    },[searchedpets])
    useEffect(()=>{
        setpets(searchBack)
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
            axios.get(SERVER_URL + '/staff/getAll', {
                auth: {
                    username: props.user.username,
                    password: props.user.password
                }
            })
                .then(response => {
                    setSearchBack(response.data)
                    console.log(searchedpets)
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
                            <input className='Min1' placeholder='Search' name="search" id='search' type='text' required onChange={handleChange} />
                        </div>
                        <div className='Mfiltersort'>
                        <div className='Mfilter'>
                                <label className='Mlabel2'>Search By</label>
                                <select className='Min2' placeholder='Filter' id='filter' name="filter" required onChange={handleChange}>
                                    <option value="name" >Name</option>
                                    <option value="age">Age</option>
                                    <option value="species" selected>Species</option>
                                    <option value="breed">Breed</option>
                                    <option value="gender">Gender</option>
                                </select>
                            </div>
                            <div className='Msort'>
                                <label className='Mlabel2'>Sort By</label>
                                <select className='Min2' placeholder='Sort' id='sort' name="sort" required onChange={handleChange}>
                                    <option value="name" selected>Name</option>
                                    <option value="age">Age</option>
                                    <option value="species">Species</option>
                                    <option value="breed">Breed</option>
                                    <option value="gender">Gender</option>
                                </select>
                                
                            </div>
                            <button className='btn btn-dark shelter-search-btn' onClick={handleSearch} >Search/Filter</button>
                        </div>
                    </div>
                        <div className='container Mcardsholder'>
                            {pets.map((pet) => (
                            <div className='Mcard'>
                                {/* {image = require(pet.image)} */}
                                <img src={image} alt='error' className='Mimg'/>
                                <div className='MLinkHolder'>
                                    <Link to={"/petprofile"} className='Mlink btn btn-dark'>View Profile</Link>
                                    <Link className='Mlink btn btn-dark'>Direct adoption</Link>
                                </div>
                                <div className='Minfo'>
                                    <div className='Minfoparts'>
                                    <label className='Mlabel'>Name:</label>
                                    <p className='Mp'>{pet.name}</p>
                                    </div>
                                    <div className='Minfoparts'>
                                    <label className='Mlabel'>Age:</label>
                                    <p className='Mp'>{pet.age}</p>

                                    </div>
                                    <div className='Minfoparts'>
                                    <label className='Mlabel'>Species:</label>
                                    <p className='Mp'>{pet.species}</p>

                                    </div>
                                    <div className='Minfoparts'>
                                    <label className='Mlabel'>Breed:</label>
                                    <p className='Mp'>{pet.breed}</p>

                                    </div>
                                    <div className='Minfoparts'>
                                    <label className='Mlabel'>Gender:</label>
                                    <p className='Mp'>{pet.gender}</p>
                                    </div>
                                </div>
                            </div>
                            ))}

                        </div>
                </section>
            </div>
        </div>
    );
}

export default Pets;





//     const petty = [
//         {image : require("../../images/cat.jpg"),
//         name  : 'LoLo',
//         age  : '3 Months',
//         species : 'Cats',
//         breed  : 'Persian',
//         gender : 'Male'
//         },
//         {image : require("../../images/doogg.jpg"),
//         name  : 'Dody',
//         age  : '1 Year',
//         species : 'Dogs',
//         breed  : 'Golden Retriever',
//         gender : 'Male'
//         },
//         {image : require("../../images/animal.jpg"),
//         name  : 'Migo',
//         age  : '2 Years',
//         species : 'Hippopotamus amphibius',
//         breed  : 'No Breed',
//         gender : 'Female'
//         },
//         {image : require("../../images/dd.jpg"),
//         name  : 'Mady',
//         age  : '2 Months',
//         species : 'Dogs',
//         breed  : 'Siberian Husky',
//         gender : 'Male'
//         },
// ]