import { gql } from 'apollo-boost'


export const ALL_MOVIES = gql`
{
  movies {
    id
    name
    genre
    directorId
    director {
      id
      name
    }
  }
}
`
