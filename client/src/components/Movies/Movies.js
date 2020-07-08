import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


const ALL_MOVIES = gql`
  {
    movies {
      id
      name
      genre
    }
  }
`


const Movies = () => {
  const { loading, error, data } = useQuery(ALL_MOVIES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>

  return(
    <ul className="movies">
      {data.movies.map( ({ id, name, genre }) => (
        <li key={id}>{ name } / { genre }</li>
      ))}
    </ul>
  )
}

export default Movies
