const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const initialData = require("./InitialData");
app.use(express.urlencoded());

let students = initialData;
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student', (req,res)=>{
    res.json(students);
});
app.get('/api/student/:id', (req,res)=>{
    const student=students.find((s) => s.id === parseInt(req.params.id));
    if(!student){
        res.status(404).send('Student not found')
    }else{
        res.json(student);
    }
});
app.post('/api/student', (req,res)=>{
    const {name, currentClass, division } = req.body;
    if(!name || !currentClass || !division){
        res.status(400).send('Missing required fields');
    }else{
        const newStudent = {
            id: students.length+1,
            name,
            currentClass,
            division,
        };
        students.push(newStudent);
        res.json({id: newStudent.id});
    }
});
app.put('/api/student/:id', (req, res)=>{
    const student=students.find((s) => s.id === parseInt(req.params.id));
    if(!student){
        res.status(400).send('Invalid Student Id')
    }else{
        const {name} = req.body;
        if(!name){
            res.status(400).send('Invalid Update')
        }else{
            student.name = name;
            res.json(student);
        }
    }
});

app.delete('/api/student/:id', (req, res)=>{
    const index=students.find((s) => s.id === parseInt(req.params.id));
    if(index === -1){
        res.status(400).send('Student Not Found');
    }else{
        students.splice(index, 1);
        res.send('Student Deleted Successfully')
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   