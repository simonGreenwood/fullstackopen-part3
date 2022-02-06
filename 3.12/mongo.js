const mongoose = require("mongoose")

const password = process.argv[2]
const url = `mongodb+srv://simon813:${password}@cluster0.girxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]){
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name : name,
    number : number
  })

  person.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })

  
} 

else {
  Person
  .find({})
  .then(persons=> {
    console.log("phonebook: ")
    persons.map(person => {
      console.log(person.name,person.number)
    })
    mongoose.connection.close()
  })
}