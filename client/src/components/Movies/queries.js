import { gql } from 'apollo-boost'


export const ALL_MOVIES = gql`
query ($name: String) {
  movies(name: $name) {
    id
    name
    genre
    watched
    directorId
    director {
      id
      name
    }
  }
}
`
