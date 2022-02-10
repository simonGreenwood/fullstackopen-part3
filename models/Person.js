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
const validator =  (number) => {
  const splitNumber = number.split("-") 
  return (splitNumber[0].isInteger() && (splitNumber[0].length === 2 || splitNumber[0].length === 3)  && splitNumber[-1].isInteger && splitNumber.length === 2)
}
const msg = (value) => `${value} is not a valid phone number!`

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (number) => {
        const splitNumber = number.split("-") 
        console.log(splitNumber)
        console.log("splitNumber[0].isInteger()", splitNumber[0].isInteger())
        console.log("splitNumber[0].length === 2 || splitNumber[0].length === 3)",splitNumber[0].length === 2 || splitNumber[0].length === 3)
        console.log("splitNumber[-1].isInteger",splitNumber[-1].isInteger)
        console.log("splitNumber.length === 2",splitNumber.length === 2)
      },
      message: number => `${number} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  number: String
});


module.exports = mongoose.model('Person', personSchema)