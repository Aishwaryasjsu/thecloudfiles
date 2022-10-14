import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'



function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate()
    const onLogin= ()=>{
        // const body = {
        //     "username": username,
        //     "paswword" : password
        // }
        // console.log(body)
        Axios.post("http://localhost:3001/login",
        {
            username: username, password: password,
        }).then(result => {
           const data = result.data;
             console.log(data);

            if(data.auth){
                alert("successfull Login");
                navigate("/getlist");

            }else{
               alert(data.message?data.message:"Unauthorized");
            }
           
            
           localStorage.setItem('uname',username);
           
    });

    }
    return(
        <section>
            <div className="container-fluid">
                <div>
                    <p>Please Login here!!</p> 
                    <label htmlFor="Username"><b>Username</b></label>
                    <input type="text" placeholder=" Please enter Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <br/>
                    <label htmlFor="Password"><b>Password</b></label>
                    <input type="password" placeholder="Please enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <br/>
                    <button onClick={onLogin}>Submit</button> 
                    
                    <a href="/register">Register</a>
                </div>
            </div>
        </section>
        
       

       

    );
}
export default Login;