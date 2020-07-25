import { gql }  from 'apollo-boost'


export const ADD_MOVIE = gql`
  mutation addMovie($name: String!, $genre: String!, $directorId: ID!, $watched: Boolean!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId, watched: $watched) {
      id
    }
  }
`
export const UPDATE_MOVIE = gql`
mutation updateMovie($id: ID!, $name: String, $genre: String, $directorId: ID, $watched: Boolean) {
  updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId, watched: $watched) {
    id
  }
}
`
