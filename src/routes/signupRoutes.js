
const express = require('express');
const user = require('../data/user.js');
const app = express();
const alert = require('alert'); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const signupRouter=express.Router();
// var popup = require('popups');



//redirecting the broowder to use SIGNUPRouter , whenever we get /signup/... request
function router(nav1){
var user=require('../data/user.js');
signupRouter.get('/',function(req,res){
    res.render("signup",
    {
        nav1,
         title:"Library"
    }); //render to pass data as object
});
//defining the action upon submitting the form
signupRouter.post('/', function (req, res) { 
    var data = req.body; 
    console.log("Name: ", data.fname); 
    console.log("Name: ", data.lname); 
    console.log("Name: ", data.pnumber); 
    console.log("Name: ", data.email); 
    console.log("Password: ", data.password); 

    var newuser={
    "email":data.email,
    "password":data.password
    }
    
    //first check if the phone number is valid , in order to procedd to the remaining validations.

    if(data.pnumber.length ==10){
      if (data.password.length < 8) {
          alert('password must be >8');
           res.redirect('/signup');
      }
      else{
        if (data.password==data.password1){
          // alert("same passwords");
          // var ptrn=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
          var ptrn = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
          if (data.password.match(ptrn)){
            alert("password pattern correct");
            user.push(newuser);
    console.warn('added',{user});
// /saving to database
            res.redirect('/login');
          }
          else{
            alert("Password must contain an uppercase, lowercase,number");
            res.redirect('/signup');
          }
          
        }
        else{
          alert("Passwords donot match");
          res.redirect('/signup')
        }
      }

// }
    
      // res.redirect('/login');
    }
    else{
      alert("Please enter a valid 10 digit phone number!!");
      res.redirect('./signup');
    }
  // }


 
}); 


return signupRouter;
}
module.exports=router;
