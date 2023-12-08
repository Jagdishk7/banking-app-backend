
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path:'./config.env'});

//connecting to database

const DB = "mongodb+srv://jagdeesh:pwdacait7atlas@jagdeesh.z9xpgd5.mongodb.net/Banks2?retryWrites=true&w=majority";

mongoose.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(()=>{
  console.log("connection successful")
})
.catch((err)=>console.log("no connection"));




var app = express();


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



app.use('/', (req, res) => {
  res.status(200).json({ data: 'Banking2 Server;' });
});
app.listen(8000, () => {
  console.log(`server is listening at http://localhost:8000`);
})
// module.exports = app;
