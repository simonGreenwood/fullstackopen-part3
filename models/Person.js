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
const validator = (number) => {
  console.log(number)
  const splitNumber = number.split("-") 
  console.log(splitNumber)
  console.log(splitNumber[0].length === 2 || splitNumber[0].length === 3)
  return (parseInt(splitNumber[0])!==NaN && (splitNumber[0].length === 2 || splitNumber[0].length === 3)  && parseInt(splitNumber[-1])!==NaN && splitNumber.length === 2)
}
const personSchema = new mongoose.Schema({
  name: String,
  number: {
    type: String, 
    validate: {
      validator: (number) => validator(number),
      message: number => `${JSON.stringify(number.value)} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});


module.exports = mongoose.model('Person', personSchema)