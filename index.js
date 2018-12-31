//initialization

const express = require('express');
const app = new express();

//Middleware

app.use(express.json());

const courses = [
    {
        id :1,name:'Bangla'
    },
    {
        id :2,name:'Maths'
    },
    {
        id :3,name:'English'
    },

]

app.get('/',(req,res)=>{
    res.send("Hello world");
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res)=>{
    const course = {
        id : courses.length + 1,
        name : req.body.name 
    };

    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id',(req,res)=>{
     const course = courses.find(c => c.id===parseInt(req.params.id));
     if(!course){
         res.status(404).send('Not Found');
     }
    res.send(course);
});

//update data
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Not Found');
    }
     
    //update operation
    course.name = req.body.name;
    //send data
    res.send(course);
})

// Delete Data
app.delete('/api/courses/:id',(req,res)=>{
    //find course
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("No course found");


    //find index
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

})

//express port and listen
app.listen(8000,()=>{
    console.log("Listening on " + 8000);
})



