import express from "express";

import mysql from "mysql";

import bodyParser from "body-parser"; 
const app = express();

const port = 3002;

app.set("view engine","ejs");
app.set("views","views");

app.use(bodyParser.urlencoded({ extended: false }));

// let data =[
//     {name :"apple",id:1},
//     {name :"orange",id:2},
//     {name :"grapes",id:3},
//     {name :"grapes",id:3},
// ];
var con = mysql.createConnection({
    host : "localhost",
    user:"root",
    password:"admin@123",
    database:"mydb"
});
// let data = con.connect(function(err){
//     if(err){
//         throw err;
//     }else{
//         let ans =con.query("select * from Search_based_on_value",function(res,err,fields){
//             if(err){
//                 throw err;
//             }
//             else{
//                 console.log(res);
//             }
//         })
//         return ans;
//     }
// })


app.get("/",(request,response)=>{
   response.render("index",{data :[]});
});

app.get("/search",(req,res)=>{
    const searchTerm = req.query.term;
   if(!searchTerm){
        res.redirect("/");
    }else{
   // const filterData = data.filter(item=>item.name.toLowerCase().includes(searchTerm.toLowerCase()));
   // console.log(filterData);
//    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    con.query("select * from searchBasedOnValue WHERE cityname LIKE ?", [`%${searchTerm}%`],(results,err)=>{
        if (err) {
            console.error(err);
            return res.render('index', { data: [] }); // Ensure data is always an array
        }
       console.log(results.stringfy);
        const data = Array.isArray(results) ? results : [];
        console.log(data);
        res.render('index', { data });
    })
}
});

app.listen(port,()=>{
    console.log(`Listnening to port ${port}`);
})