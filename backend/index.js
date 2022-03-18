import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const MONGO_URL= `mongodb+srv://sudeep:root@cluster0.tdpin.mongodb.net/myLoginRegisterdb?authSource=admin`


mongoose.connect(
  MONGO_URL
  
).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`)

)

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
 
});

const User = new mongoose.model("User", userSchema);

//Routes

app.post("/login", (req, res) => {
 const{email,password}= req.body
 User.findOne({email:email},(err,user)=>{
if(user){
    if(password === user.password){
        res.send({message:"Login Successful" , user : user})
    } else {
        res.send({message:"password didnot match"})
    }

} else{
    res.send("User not found")

}
 })
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully Registered , please login now" });
        }
      });
    }
  });
});

app.listen(9002, () => {
  console.log("9002");
});
