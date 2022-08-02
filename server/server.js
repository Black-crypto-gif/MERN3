const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user')
const cors = require('cors');
// Init app :
const app = express();
// Middleware :
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors())
app.use((req, res, next)=>{
    console.log(req.path.bgGreen , req.method.bgRed);
    next();
})
// Connect to databese :
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    // Listen for requests:
    app.listen(process.env.PORT, ()=>{
        console.table('Database is connected'.bgGreen);
        console.table(`SERVER LISTENING AT ${process.env.PORT}`.bgBlue);
    })
    
}).catch((err) => {
    console.table(err);
})

//Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);