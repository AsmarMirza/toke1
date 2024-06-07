import express from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const app = express()
const port = 3000

app.use(express.json())


const privateKey="eft$3456&%$0@$gfy{"
const kittySchema = new mongoose.Schema({
    email: {type:String,required:true},
    password: {type:String,required:true},
    role: {type:String,required:true,default:"user"}
  });

  const Kitten = mongoose.model('Kitten', kittySchema);

  mongoose.connect('mongodb+srv://Esmer:esmer123@cluster0.zbeu6hy.mongodb.net/')
  .then(() => console.log('Connected!'))
  .catch(()=>console.log("not connected"))


app.get('/user',async (req, res) => {
try {
    const token=req.headers.authorization
    const decoded=jwt.verify(token, privateKey);
    const data=await Kitten.find({})
    if (!token) {
      return  res.status(400).json({message:"token is not valid"})
    }
    if (decoded.role!=="admin") {
        return  res.json({message:"you dont have permission"})
    }
    res.json(data)
} catch (error) {
   res.json(error) 
}
})

app.post('/signin',async (req, res) => {
    try {
        const {email,password}=req.body
        const data=new Kitten({email,password})
        await data.save()
      res.send(data) 
    } catch (error) {
        res.send(error) 
    }
})


app.post('/login',async (req, res) => {
    try {
        const {email,password}=req.body
        const data=await Kitten.findOne({email:email})
        if (!data) {
          return  res.status(404).json({message:"email is not found"})  
        }
        if (password!==data.password) {
            return  res.status(400).json({message:"wrong password"})
        }
        const token = jwt.sign({ email: data.email,role:data.role },privateKey);
      res.send({token:token}) 
    } catch (error) {
        res.send(error) 
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})