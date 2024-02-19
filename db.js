import mysql from "mysql2";

let con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin@123",
    database :"mydb"
});

con.connect(function(err){
    if(err){
        throw err;
    }else{
        con.query("select * from Search_based_on_value",function(err,res,fields){
            if(err){
                throw err;
            }
            else{
                console.log(res);
            }
        })
        console.log("connected");
    }
})