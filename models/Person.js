require('dotenv').config()
const mongoose = require("mongoose")
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url).then(result => {

  console.log("Connected to MongoDB")
  
}).catch(error => {

  console.log("Could not connect to MongoDB")

})

const personSchema = new mongoose.Schema({
  name: String, 
  number: String, 
})
module.exports = mongoose.model('Person', personSchema)