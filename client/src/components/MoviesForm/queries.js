import { gql } from 'apollo-boost'


export const ALL_DIRECTORS_SELECT = gql`
  {
    directors {
      id
      name
    }
  }
`
