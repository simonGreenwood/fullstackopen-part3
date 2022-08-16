const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require("./models/Person")
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.post('/api/persons/', (request,response,next) => {

  const person = request.body
  console.log(person)
  const personToSave = new Person({
    name:person.name,
    number:person.number
  })
  personToSave
    .save()
    .then( savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => {
      next(error)
  })
})

app.get('/api/persons', (request, response) => {
  Person
  .find({})
  .then(persons=> {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    console.log(person)
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})



app.delete('/api/persons/:id/',(request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(result => {

    response.status(204).end()
  }).catch(error => {
    console.log(error)
    next(error)
  })
})

app.put("/api/persons/:id",(request,response, next) => {
  const personToUpdate = Person.findById(request.params.id)
  Person
  .findOneAndUpdate(personToUpdate,request.body,{runValidators:true,new:true})
  .then(returnedPerson=>{
    console.log(returnedPerson)
    response.status(200).json(returnedPerson.toJSON()).end()
  })
  .catch(error => {
    next(error)
    return
  })
})
app.get('/info', (request, response) => {
  Person
  .find({})
    .then(persons=> {
    response.send(`<p>The phonebook has info for ${persons.length} people </p><p>${new Date()}</p>`)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({error : error.message})
  } else if (error.name === 'TypeError') {
    return response.status(400).send({error:'user already removed'})
  } else if (error.name === 'MongoServerError') {
    return response.status(400).send({error:'User already exists!'})
  } else {
    console.log(error.message)
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
*/

/*Person.find({"_id":id}).then(person => {
  console.log(person)
  response.json(person)
})
const person = persons.find(person => person.id==id)
if (person) {
  response.json(person)
} else {
  response.status(404).end()
} */