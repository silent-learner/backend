const mongoose = require('mongoose')

const connecttomongo = () => {
    mongoose.set('strictQuery',true)
    mongoose.connect(process.env.MONGO_URI,() => {
        console.log("Connected to DB");
    })
} 

module.exports = connecttomongo