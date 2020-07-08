const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = graphql

const Movie = require('./models/movie')
const Director = require('./models/director')


const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLID },
    director: { 
      type: DirectorType, 
      resolve(parent, args) {
        return Director.findById(parent.directorId)
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id })
      }
    }
  })
})


// Queries
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id)
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id)
      }
    },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find()
      }
    },
    directors: {
      type: GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find()
      }
    }
  },
})

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, { name, age }) {
        const director = new Director({
          name,
          age
        })
        return director.save()
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID }
      },
      resolve(parent, { name, genre, directorId }) {
        const movie = new Movie({
          name,
          genre,
          directorId
        })
        return movie.save()
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
