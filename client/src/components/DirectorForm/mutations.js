import { gql }  from 'apollo-boost'


export const ADD_DIRECTOR = gql`
  mutation addDirector($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      id
      name
      age

      movies {
        id
      }
    }
  }
`
export const UPDATE_DIRECTOR = gql`
mutation updateDirector($id: ID!, $name: String, $age: Int) {
  updateDirector(id: $id, name: $name, age: $age) {
    id
    name
    age
  }
}
`
