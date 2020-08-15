const express=require('express')
const app=express()
const path=require('path')

const session=require('express-session')
const apiroute=require('./apiroute')

const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname+'../../client/build')))

const {PORT, SESS_NAME, SESS_SECRET, SESS_TIME, NODE_ENV} = require('./config')

app.use(session({
    name:SESS_NAME,
    secret:SESS_SECRET,
    resave:false,
    saveUninitialized:false,
    rolling:true,
    cookie:{
        maxAge:SESS_TIME,
        sameSite:true,
        secure:(NODE_ENV==='production')?true:false
    }
}))

app.get('/',(req,res)=>{
		res.sendFile(path.join(__dirname+'../../client/build/index.html'))
})
app.get('/signup',(req,res)=>{
		res.sendFile(path.join(__dirname+'../../client/build/index.html'))
})
app.get('/signin',(req,res)=>{
		res.sendFile(path.join(__dirname+'../../client/build/index.html'))
})
app.get('/home',(req,res)=>{
		res.sendFile(path.join(__dirname+'../../client/build/index.html'))
})
app.get('/users',(req,res)=>{
		res.sendFile(path.join(__dirname+'../../client/build/index.html'))
})
app.post('/users',(req,res)=>{
		res.sendFile(path.join(__dirname+'../../client/build/index.html'))
})
app.put('/users',(req,res)=>{
		res.sendFile(path.join(__dirname+'../../client/build/index.html'))
})


app.use('/api',apiroute)

app.listen(PORT,()=>console.log('server up on port 5000'))