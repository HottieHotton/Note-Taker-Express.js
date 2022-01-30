const PORT = process.env.PORT || 3001;
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req , res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})


app.listen(PORT, () =>{
console.log('The Website App is listening at port',PORT);
});