import React, { useState } from "react"
import "./Signup.scss"
import axios from "axios";
import validator from 'validator';
import { useHistory } from "react-router-dom"

const Signup = () => {

    const history = useHistory()
    //assign the state to the user
    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: "",
        contactNo:""

    })
    //getting the inputs as user enters the value
    const handle = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
// sign up a new user with input validations
    const signUp = () => {
        console.log(user);
        const { name, email, password, reEnterPassword ,contactNo} = user
        if( name && email && password &&contactNo &&(password === reEnterPassword))
        {
            //validations starts here
            if(!(validator.isEmail(email))){
                return alert("Please enter valid email!");
            }
            if(!(validator.isMobilePhone(contactNo))){
                return alert("Please enter valid phone number of 10 digits!");
            }
        
            axios.post("http://localhost:9008/user", user) 
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        } else {
            alert("Please enter all the details!!")
        }
        
    }

    return (
        <div className="signUp">
           
            <h1>Sign Up Now</h1>
            <br/>
            <input type="text" name="name" value={user.name} placeholder="Please enter your Name" onChange={ handle }></input>
            <br/>
            <input type="text" name="email" value={user.email} placeholder="Please enter your Email" onChange={ handle }></input>
            <br/>
            <input type="text" name="contactNo" value={user.contactNo} placeholder="Please enter your contact number" onChange={ handle }></input>
            <br/>
            <input type="password" name="password" value={user.password} placeholder="Please enter a strong Password" onChange={ handle }></input>
            <br/>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Please Re-enter Password" onChange={ handle }></input>
            <br/>
            <div className="button" onClick={signUp} >Sign Up</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default Signup;