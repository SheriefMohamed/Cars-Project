const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const port=5000;

// DB connection
mongoose.connect(process.env.DB_Connection, () => {
    console.log('Connection completed !!');
} );

// body-parser >> to use body
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//test first page (jyst for testing)
app.use('/page', (req,res) => {
    res.json("ok");
});

// user routes
app.use('/api',require('./routes/user'));

// admin routes
app.use('/admin',require('./routes/admin'));

app.listen(port,()=>{
    console.log(`The server run in ${port}`);
})