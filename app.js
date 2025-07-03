const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
  res.render("index.ejs");
})

app.get('/read',async (req,res)=>{
  let users = await userModel.find();
  // res.render("read", {users: users});
  // or
  res.render("read", {users});
  
})

app.post('/create',async (req,res)=>{
  let {name, email, image} = req.body;
  // await userModel.create({
  //   name: name,
  //   email: email,
  //   image: image
  // })
  //or
  let createdUser = await userModel.create({
    name,
    email,
    image
  });
  res.redirect("/read");
})

app.get('/delete/:userid',async (req,res)=>{
  let users = await userModel.findOneAndDelete({_id: req.params.userid});
  res.redirect("/read");
})

app.post('/update/:userid',async (req,res)=>{
  let {name, email, image} = req.body;

  let user = await userModel.findOneAndUpdate({_id: req.params.userid},{name, email, image}, {new: true});
  res.redirect("/read");
  
})



app.listen(3000);