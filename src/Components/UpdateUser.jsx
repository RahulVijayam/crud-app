import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUsers(){
    const {id} = useParams()
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [age,setAge]=useState();
    const navigate = useNavigate();
    //console.log(id)

    useEffect(()=>{
        axios.get('http://localhost:3001/getuser/'+id)
        .then(result =>{
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)
            console.log(result)
        
        })
        .catch(err => console.log(err))
    },[])

    const Update = (e) =>
        {
            e.preventDefault()
            axios.put("http://localhost:3001/updateUser/"+id,{name,email,age})
            .then(result => {
                console.log(result)
                navigate('/')
                alert("User Updated Succesfully)")
            })
            .catch(err => console.log(err))



        }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
        <Link to="/" className="btn btn-dark">Home</Link>
 
            <form onSubmit={Update}>
                <h2>Update User</h2>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Name" value={name} className="form-control"
                    onChange={(e)=> setName(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" value={email} className="form-control"
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label>Age</label>
                    <input type="number" placeholder="Enter Age" value={age} className="form-control"
                    onChange={(e) => setAge(e.target.value)}/>
                </div>
                <button className="btn btn-success">Update</button>
            </form>
    
    
        </div>
    
    </div>


    )
}

export default UpdateUsers;