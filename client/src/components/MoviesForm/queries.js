import { gql } from 'apollo-boost'


export const ALL_DIRECTORS = gql`
  {
    directors {
      id
      name
    }
  }
`
