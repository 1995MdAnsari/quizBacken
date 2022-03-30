let express = require("express");
const bodyParser = require("body-parser")
let mysql = require("mysql"); // Data base connections
let connData = {
    host:"localhost",
    user : "root",
    password:"",
    database:"quizdb"
};

let app = express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONs, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Request-With,Content-Type,Access"
    );
    next();
});
app.listen(3001, () =>console.log("Node app listening on port 3001"));

app.get(bodyParser.urlencoded({extended:true}));

app.post("/api/insert",(req,res) =>{

    let countError = req.body.countError;
    let name = req.body.name;
    // let date = req.body.date;
    let connection=mysql.createConnection(connData);
    // let sql="SELECT * FROM quiz";
    let sql = "INSERT INTO quiz(name,countError,date) VALUES(?,?,'2022-09-03');"
    connection.query(sql,[name,countError],function(err,result){
        if(err) console.log("Error in database",err.message);
        else console.log(result);  
    });
});
