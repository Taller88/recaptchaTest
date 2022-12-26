const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
app.set('port', process.env.ports||8080);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.get("/", (req, res, next)=>{
    console.log("recaptcha Test: "+ process.env.ports);

    res.send("recaptcha");
});
app.get("/recaptcha/api2/anchor", (req, res, next)=>{
    console.log("/recaptcha/api2/anchor Test");
    //'https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Lc3fgATAAAAAGs68Yfc6gFlTP0LK-KtWj1AD7C7&co=aHR0cDovLzEyNy4wLjAuMTo1NTAw&hl=ko&v=5qcenVbrhOy8zihcc2aHOWD4&size=normal&cb=hmxax0bzqhc8'
    // http://localhost:8080/recaptcha/api2/anchor?ar=1&k=6Lc3fgATAAAAAGs68Yfc6gFlTP0LK-KtWj1AD7C7&co=aHR0cDovLzEyNy4wLjAuMTo1NTAw&hl=ko&v=5qcenVbrhOy8zihcc2aHOWD4&size=normal&cb=hmxax0bzqhc8
    res.render("anchor");
});

app.get("/recaptcha", (req, res, next)=>{
    console.log("recaptcha Test");
    res.render("recaptcha");
});

app.get("/worker", (req, res, next)=>{
    console.log("worker endpoint Test");
    res.send("importScripts('http://localhost:5500/recaptcha/recaptcha__ko.js');");
});

//
app.listen(app.get('port'),()=>{
    console.log("[Server] open : "+ app.get('port'))
})