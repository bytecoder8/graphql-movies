import { gql } from 'apollo-boost'


export const ALL_DIRECTORS = gql`
  query ($name: String) {
    directors(name: $name) {
      id
      name
      age
      movies {
        id
        name
        genre
        watched
      }
    }
  }
`
