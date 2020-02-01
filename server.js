const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB  =  require('./config/db');


//load env variables
dotenv.config({path: './config/config.env'});

// connect to db
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// static 
app.use(express.static(path.join(__dirname + '/public')));

//routes 
try{
    app.use('/api/v1/sites', require('./routes/sites'))
app.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

}
catch (error)
{
    console.error(error);
    process.exit(1);
}
