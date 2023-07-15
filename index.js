const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/coLab", { useNewUrlParser: true, useUnifiedTopology: true });
const projectSchema = new mongoose.Schema({
    "title" : String,
    "description" : String
})

const Project = mongoose.model("Project", projectSchema);

app.get("/", (req, res)=>{
    res.send("<h1>It's a home page</h1>");
});

app.get("/projects", (req, res)=>{
    res.sendFile(__dirname+"/projects.html");
});


app.post("/projects", (req, res)=>{
    const newProject = new Project({
        title : req.body["project-title"],
        description : req.body["project-description"]
    });
    newProject.save();
    res.redirect("/");
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})