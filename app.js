const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
app.set('port', process.env.ports||9180);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get("/recaptcha", (req, res, next)=>{
    console.log("recaptcha Test");
    res.render("recaptcha");
})

app.listen(app.get('port'),()=>{
    console.log("[Server] open : "+ app.get('port'))
})