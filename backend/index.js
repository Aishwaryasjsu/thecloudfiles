
const bodyParser = require("body-parser");
const express =require("express");
const app =express();
const mysql =require("mysql");
const multer = require('multer');
const upload = multer();
const path =require("path");
require("dotenv").config();
const aws=require("aws-sdk");
const multerS3=require("multer-s3");
const uuid =require('uuid').v4;


aws.config.update({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: process.env.Region
    

})



s3 = new aws.S3();
 const Bucket=process.env.Bucket;

var bucketParams = {
    Bucket: process.env.Bucket,
  };

  



app.use(bodyParser.json()); // to parse data 
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array()); --commented was creating issue during multer
app.use(express.static('public'));


app.use(function(req, res, next) { //used as we had two diff ports 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
  const db = mysql.createConnection({
    host: "database-1.c8oxondilugf.us-west-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "admin123",
    database: "mydb",
});

db.connect((err) => {
    if(err){
        console.log(err.message);
        return;
    }
     console.log("Database connected");
    });


   
// app.get("/Register", (req, res) => {
//   // console.log("req object",req);
//     db.query('select firstname,lastname from mydb.users;', (err, res1) => {
//         if (err) {
//             console.log("inside error");
//             console.log(err);
//            // res1.send("failed");
//         } else {
//             console.log(res1);
//            res1.send('got data');// postname ko send krna h send once either query or this 

          
//         };
//     })
//         ;

// });


// app.get("/Register", (req, res) => {
   
//     res.send("hello");
//     console.log("helloaishu");
// });




app.post("/Register", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const username = req.body.username;
    const password = req.body.password;

    const sqlINsert = " INSERT INTO mydb.users (firstname,lastname,username,password) values(?,?,?,?);"
    db.query(sqlINsert, [firstname, lastname, username, password], (err, res1) => {
        if (err) {
            console.log("inside error");
            console.log(err);
            // res1.send("failed");
        } else {
            //console.log(res1); //can use to se response of db
            res.send('data insered');// postname ko send krna h send once either query or this 
        };
    })
    // res.send(name);
    // console.log(name);
});


app.post("/login", (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    const sqlINsert = " select username,password from mydb.users where username=? ;"
    db.query(sqlINsert,[username], (err, res1) => {
        if (err) {
            console.log("inside error");
            console.log(err);
            // res1.send("failed");
            res.send({auth:false,message:"User authentication failed"});
        } else {
            //console.log(res1); //can use to se response of db
           if( res1.length > 0)
           {
            if( password==res1[0].password ){
                console.log(res1);
                console.log(res1[0].password)
            console.log("welcome to filesystems");
            res.send({auth:true,message:"welcome to filesystems"});
            }
            else{
                console.log("username or password do not match");}
                res.send({auth:false,message:"username or password do not match"});
               
           }else{console.log("user does not exist please register");
       // console.log(res1);
      // console.log(res1[0].password)
      res.send({auth:false,message:"user does not exist please register"});
    }
};
    })
   
   
});

const about = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketParams.Bucket,
         bucket: Bucket,
        //  bucket:"aishbucket1",

        acl: "public-read",
         key: (req, fileData, cb)=> { 
            console.log(fileData.originalname);
            cb(null, fileData.originalname);}

        // key:(req, fileData, cb) =>{//
        //     const ext=path.extname(fileData.originalname);///
        //     cb(null, '${uuid()}${ext}');}//firest try 
        
        
    })

});

// const about = multer({dest:"uploads/"});
app.post("/about", about.any("fileData"), (req, res) =>  {
    const userid ="Aishlodhi";
    const url = req.files[0].location;
    const description = req.body.description;
   const filename=req.files[0].originalname;
   const etag=req.files[0].etag;
   
    // const filename=fileData.originalname;
    //const updatetime=req.body.description[0] ;
    // console.log(req.body);
    //console.log(req); 
    console.log(req.files[0].originalname);
    
    console.log(req.files[0].etag);
    // console.log(req.files);
    //console.log(req.body.description[0])
    
    const sqlINsert = " INSERT INTO mydb.Filedetails (userid,url, description,filename,etag) values(?,?,?,?,?);"
    db.query(sqlINsert, [userid,url,description,filename,etag], (err, res1) => {
        if (err) {
            console.log("inside error");
            console.log(err);
            // res1.send("failed");
        } else {
            //console.log(res1); //can use to se response of db
            // res.send('data insered');// postname ko send krna h send once either query or this 
        };

    })
    res.json({status:"sucess"  });// +req.file.location
   
});

app.get("/deleteFile/:uname/:fileName",function (req, res) {
    var params = {
        Bucket: bucketParams.Bucket,
        Key: req.params.fileName,
      };
    s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log("node delete ===")
          console.log(err);
        } else {
            try{
            const sqlINsert = "delete from mydb.Filedetails where userid=? and filename=?;"
            db.query(sqlINsert,[req.params.uname,req.params.fileName], (err, res1) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(res1);
                }
            });}
            catch(e){
               console.log(e);
            }
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.json(data);
        }
    });
});

app.get("/getlist",async (req,res)=>{
    // s3.listObjects(bucketParams, function (err, data) {
    //     if (err) {
    //       console.log("Error", err);
    //     } else {
    //       console.log("Success", data);
    //       let files = [];
    //       data.Contents.map((k, i) => {
           
    //           files.push(k);
            
    //       });

    //       res.json(files);
    //     }


    //   });
    const userid = "Aishlodhi";
      const sqlINsert = " select userid,filename,description,create_date,url,etag from mydb.Filedetails where userid=? ;"
      db.query(sqlINsert,[userid], (err, data) => {
          if (err) {
              console.log("inside error");
              console.log(err);
              // res1.send("failed");
          } else {
             res.json(data);
          }
      })
      
});


const port = 3001;
app.listen(port, () => {
    console.log('running at port 3001');
});


