const express = require('express');
const userRouter = express.Router();
const userController = require("../controller/user.controller.js")
const passport=require('../configue/passport.js')



userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.patch('/update/:id', userController.update)
userRouter.delete('/delete/:id', userController.delete)


// Google Login
userRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

userRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to home.
        res.redirect('/');
    }
);

// Facebook Login
// userRouter.get('/facebook', passport.authenticate('facebook', {
//     scope: ['email'],
//   }));
  
//   userRouter.get('/facebook/callback',
//     passport.authenticate('facebook', { failureRedirect: '/login' }),
//     (req, res) => {
      // Successful authentication, redirect to home.
//       res.redirect('/');
//     }
//   );





module.exports = userRouter;