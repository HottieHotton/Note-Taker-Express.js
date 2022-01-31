const PORT = process.env.PORT || 3001;
const express = require('express');
const path = require('path');
var {db} = require('./db/db.json');
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));


//Normal Routes
app.get('/', (req , res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


//API Routes
app.get('/api/notes', (req,res) =>{
    res.json(db);
});

app.post('/api/notes', (req,res) =>{
    const newNote = req.body;
    newNote.id = uniqid();

    db.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({db}, null, 2)
    );

    res.json(newNote);
});

app.delete('/api/notes/:id', (req,res) => {
    let id = req.params.id;
    db = db.filter(function(note) { return note.id != id})
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({db}, null, 2)
    );
    if(db){
        res.json("Success!");
    }
    else{
        res.json(404);
    }
});

//App PORT
app.listen(PORT, () =>{
console.log('The Website App is listening at port',PORT);
});