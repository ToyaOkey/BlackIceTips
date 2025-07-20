require('dotenv').config();
const express = require('express'); 
const morgan = require('morgan'); 
const blackIceRoutes = require('./routes/blackIceRoutes');
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express(); 
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const bodyParser = require('body-parser');


// app setup 
let port = process.env.PORT || 3000; 
let host = process.env.HOST || 'localhost'; 
const mongoUri = process.env.MONGO_URI; 

// set view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(port, host, () => {
        console.log(`Black Ice Tips is running on http://${host}:${port}`);
    }); 
})
.catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Full error:', err);
}); 
// middleware
//mount middlware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: mongoUri}),
        cookie: {
            maxAge: 60*60*1000,
            secure: true,
            httpOnly: true
        }
    })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null; 
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public')); 
app.use(express.urlencoded({extended: true})); 
// app.use(express.json());
app.use(morgan('tiny')); 
app.use(methodOverride('_method')) 


app.get('/', (req, res) => {
    res.render('index'); 
}); 

// uses blackice for routing 
app.use('/items', blackIceRoutes); 
// user routes 
app.use('/users', userRoutes);

app.use((req, res, next) => {
    let err = new Error(`The page ${req.url} does not exist`);
    err.status = 404;
    next(err); 
});

app.use((err, req, res, next) => {
    if(!err.status){
        console.log(err.message);
        err.status = 500; 
        err.message = ('Internal Server Error'); 
    }
    res.status(err.status);
    res.render('error', {error: err});
}); 


