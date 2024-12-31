const express = require('express');
const app = express();
const sequelize = require("./configue/db.js")
const userRouter = require("./route/user.route.js")
const passport = require('./configue/passport.js')
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors')
const path=require('path');dotenv.config();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);



app.listen(`${process.env.PORT}`, async (req, res) => {
    try {
        console.log(`server is running on ${process.env.PORT}`)
        await sequelize.authenticate();
        console.log('Database connected');

    } catch (error) {
        console.log(error)
    }
})