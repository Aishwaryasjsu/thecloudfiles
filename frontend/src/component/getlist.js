import React, { useState ,useEffect} from 'react';
import Axios from 'axios'
import Table from 'react-bootstrap/Table'
import ReactLoading from "react-loading";

function Getlist (){
const [fileData, setFileData] = useState([]);
  
 function getUserData(){
      Axios.get("http://localhost:3001/getlist").then(resp => {
        console.log(resp.data);
        setFileData([]);
       setFileData(resp.data)
      });
  }
  useEffect(() => {
    getUserData()
  }, [])
  
  function onFileDelete(key){
    console.log(key);
    Axios.get("http://localhost:3001/deleteFile/Aishlodhi/"+key).then(resp => {
        console.log(resp.data);
       // setFileData([]);
       //setFileData(resp.data)
      }).then(()=>{alert('delete success '+key)}
      ).catch(()=>{alert("failed to delete" )})
  }

  
  return(
    <>
    <h2 className="header1">Aishlodh's files</h2>{/*isko dynamic krna h*/ }
    <h3>Logout</h3>
    
    {!fileData ? ( <ReactLoading type={"spin"} color="black" />) : (
      <Table striped bordered hover className="tableDesign">
        <thead>
          <tr>
            <th>#</th>
            <th>Filename</th>
            <th>Description</th>
            <th>last_modified</th>
            <th>Download</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {fileData.map((k, i) => (
            <tr key={k.etag}>
              <td>{i + 1}</td>
              <td>{k.filename}</td>
              <td>{k.description}</td>
              <td>
              {k.LastModified}
              </td>
             <td>
                <button className="selectButton" ><a href={k.url}>Download</a> </button>
              </td>
              <td><button className="selectButton"  onClick={() => onFileDelete(k.filename)}>Delete</button></td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    )}
    <br />
   
  </>
      
     

     

  );
}

export default Getlist;

