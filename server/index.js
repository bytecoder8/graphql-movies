const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema')

const app = express()
const PORT = 4000

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, err => err ? console.log(err) : console.log('Server started'))
