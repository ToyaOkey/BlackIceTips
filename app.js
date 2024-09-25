// modules 

const express = require('express'); 
const morgan = require('morgan'); 
const blackIceRoutes = require('./routes/blackIceRoutes');
const methodOverride = require('method-override');

const app = express(); 

// app setup 

let port = 3000; 
let host = 'localhost'; 
app.set('view engine', 'ejs'); 

// middleware

app.use(expres.static('public')); 
app.use(express.urlencoded({extended: true})); 
app.use(morgan('tiny')); 
app.use(methodOverride('_method')) 

// routing 

app.get('/', (req, res) => {
    res.render('index'); 
}); 

// uses blackice for routing 
app.use('/blackIce', blackIceRoutes); 

app.use((req, res, next) => {
    let err = new Error(`The page ${req.url} does not exist`);
    err.status = 404;
    next(err); 
});

app.use((err, req, res, next) => {
    if(!err.status){
        err.status = 500; 
        err.message = ('Internal Server Error'); 
    }
    res.status(err.status);
    res.render('error', {error: err});
}); 

// server setip 

app.listen(port, host, () => {
    console.log(`Black ice is running on http://${host}:${port}`);
}); 