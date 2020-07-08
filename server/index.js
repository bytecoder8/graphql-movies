const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema')

const app = express()
const PORT = 4000

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


mongoose.connection.once('open', () => console.log('Connected to mongoDB'))
mongoose.connect('mongodb://localhost:27017/graphql-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  app.listen(PORT, err => err ? console.log(err) : console.log('Server started'))
}).catch(error => console.log(error))

