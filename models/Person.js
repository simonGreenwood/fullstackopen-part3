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
  const part1IsNumber = !isNaN(Number(splitNumber[0]))
  const part1LengthPassed = (splitNumber[0].length === 2 || splitNumber[0].length === 3)
  const part2Passed = !isNaN(Number(splitNumber[1]))
  const lengthPassed = splitNumber.length === 2
  return part1LengthPassed && part2Passed && lengthPassed && part1IsNumber
}
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength : 3,
    unique: true
  },
  number: {
    type: String, 
    minLength:8,
    validate: {
      validator: (number) => validator(number),
      message: number => `${JSON.stringify(number.value)} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)