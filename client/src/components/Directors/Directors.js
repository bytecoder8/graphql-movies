import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'



const ALL_DIRECTORS = gql`
  {
    directors {
      id
      name
      age
      movies {
        id
        name
        genre
      }
    }
  }
`


const Directors = () => {
  const { loading, error, data } = useQuery(ALL_DIRECTORS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>


  return(
    <div className="directors">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Movies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.directors.map( ({ id, name, age, movies }) => (
              <TableRow key={id}>
                <TableCell>{ name }</TableCell>
                <TableCell>{ age }</TableCell>
                <TableCell>{ movies.map(movie => movie.name).join(', ') }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Directors
