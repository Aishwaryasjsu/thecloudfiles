import Axios from "axios";
import React, { useState } from 'react';

function Register() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const onRegister = () => {
        /* const body = {
             "firstname" : firstName,
             "lastname" : lastName,
             "username": username,
             "paswword" : password */
        Axios.post("http://localhost:3001/register",
            {
                firstname: firstname, lastname: lastname, username: username, password: password,
            }).then(() => {
                alert("successfull insert");
        });


        // Axios.get("http://localhost:3001/register").then((response)=> {
        //     console.log("wrge");
        //     console.log(response);
        //      });


 //    const requestOptions = {
        //         method: "GET",
        //         // headers: { "Content-Type": "application/json" },
        //         // body: JSON.stringify(user),
        //       };
        //       fetch("http://localhost:3001/", requestOptions)
        //         .then((response) => {
        //             console.log("wrge");
        //             console.log(response);
        //         });
                // .then((data) => {
                //   if (data.status) {
                //     this.setState({
                //       isLoggedIn: true,
                //     });
                //   }
                // });
    };


    return (
        <section>
            <div className="container-fluid">
                <div>
                    <label htmlFor="Firstname"><b>Firstname</b></label>
                    <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <br />
                    <label htmlFor="Lastname"><b>Lastname</b></label>
                    <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <br />
                    <label htmlFor="Username"><b>Username</b></label>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor="Password"><b>Password</b></label>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button onClick={onRegister}>Submit</button>

                </div>
            </div>
        </section>
    );
}

export default Register;