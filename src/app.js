const path = require("path")
const express = require('express')
const noteRouter = require('./routes/note.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app =  express()

const authRouter = require('./routes/auth.route')


app.use(cors({
 origin:true,
 credentials:true
}))

app.use(express.json())

app.use(cookieParser())




app.use("/api/auth",authRouter)

app.use("/api/notes",noteRouter)

app.use(
 express.static(
  path.join(__dirname,"..","dist")
 )
)


app.use((req,res)=>{

 res.sendFile(
  path.join(__dirname,"..","dist","index.html")
 )

})


module.exports = app