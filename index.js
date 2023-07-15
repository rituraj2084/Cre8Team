const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/coLab", { useNewUrlParser: true, useUnifiedTopology: true });
const projectSchema = new mongoose.Schema({
    "title" : String,
    "description" : String
})

const Project = mongoose.model("Project", projectSchema);

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/projectList.html");
});

app.get("/projectlists", (req, res)=>{
    // res.sendFile(__dirname+"/projects.html");
    Project.find({}, 'title')
    .exec()
    .then((projects) => {
      res.json(projects);
    })
    .catch((error) => {
      console.error('Error retrieving projects:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get("/projects", (req, res)=>{
    res.sendFile(__dirname+"/projects.html");
});

app.get('/projects/:id', function(req, res) {
    const projectId = req.params.id;
    
    Project.findById(projectId)
        .then((project) => {
            if (!project) {
                res.status(404).send('Project not found');
                return;
            }
    
            res.send(`<h2>${project.title}</h2><p>${project.description}</p>`);
        })
        .catch((error) => {
            console.error('Error retrieving project:', error);
            res.status(500).send('Internal Server Error');
        });
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