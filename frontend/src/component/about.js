
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';



export default function About() {  
console.log(localStorage.getItem('uname'));
  const [fileData, setfileData] = useState()
  const [description, setDescription] = useState("")
  const [updatetime] = useState("")
  
  const navigate = useNavigate()

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("image", fileData)
    formData.append("description", description)
    formData.append(fileData.lastModifiedDate, updatetime)
    await axios.post("http://localhost:3001/about", formData, { headers: {'Content-Type': 'multipart/form-data'}})
    console.log(fileData.name);
    console.log(fileData.lastModifiedDate);
    navigate("/getlist")
  }

  const fileSelected = event => {
    const fileData = event.target.files[0]
		setfileData(fileData)
	}

  return (
    <div className="flex flex-col items-center justify-center">
<p>Please select file to upload to S3</p>
        <form onSubmit={submit} style={{width:650}} className="flex flex-col space-y-5 px-5 py-14">
          <input onChange={fileSelected} type="file" accept="image/*"></input>
          <input value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder='description'></input>
          <button type="submit">Submit</button>
        </form>

    </div>
  )
}