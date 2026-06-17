const mongoose = require('mongoose')


async function connectToDB(){

 await mongoose.connect(process.env.MONGO_URI)


 console.log("connected to database")

 console.log("HOST:", mongoose.connection.host)

 console.log("DATABASE:", mongoose.connection.name)

}


module.exports = connectToDB