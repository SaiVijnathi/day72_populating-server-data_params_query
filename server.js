const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/countriesList",async (req,res)=>{
    let countriesList = await Employee.find().distinct("country");
    res.json(countriesList);
});

app.get("/departmentsList",async (req,res)=>{
    let departmentsList = await Employee.find().distinct("department");
    res.json(departmentsList);
});

app.get("/gendersList",async (req,res)=>{
    let gendersList = await Employee.find().distinct("gender");
    res.json(gendersList);
});



app.get("/Employees/:country/:department/:gender",async(req,res)=>{ 
    
    console.log(req.query);
    
    let employees = await Employee.find().and([
        {country:req.params.country},
        {department: req.params.department},
        {gender: req.params.gender}
    ])
    .sort(req.query.order == "desc"? "-id":"id")
    .limit(req.query.limit);

    res.json(employees);
})


app.get("/Employees",async(req,res)=>{ 
    
    console.log(req.query);
    
    let employees = await Employee.find().and([
        {country:req.query.country},
        {department: req.query.department},
        {gender: req.query.gender}
    ]);
    res.json(employees);
})

app.listen(8888,()=>{
    console.log("Listening to port 8888");
});

let employeeSchema = new mongoose.Schema({
    id:Number,
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    age: Number,
    department: String,
    country: String,
    profilePicture: String,
});

let Employee = new mongoose.model("Employees", employeeSchema, "Employees");



let connectToMDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://saivijnathitatikonda:saivijnathi@day68-intro-to-mongodb.q4dsd.mongodb.net/BRNDB?retryWrites=true&w=majority&appName=day68-Intro-to-MongoDB");
        console.log("Successfully connected to mongoDB");
    }
    catch(err){
        console.log("Unable to connect to MDB");
    }
};

connectToMDB();