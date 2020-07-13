import React from 'react'
import PropTypes from 'prop-types'
import { 
  Table, TableBody, TableCell, TableRow, TableHead,
  TableContainer, Paper, Button 
} from '@material-ui/core'


export default function MoviesTable(props) {
  const { movies, handleOpen, setMovieId } = props

  return(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Director</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map( movie => (
            <TableRow key={ movie.id }>
              <TableCell>{ movie.name }</TableCell>
              <TableCell>{ movie.genre }</TableCell>
              <TableCell>{ movie.director ? movie.director.name : 'Invalid' }</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={event => handleOpen(event, movie)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={event => setMovieId(movie.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

MoviesTable.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any),
  handleOpen: PropTypes.func.isRequired,
  setMovieId: PropTypes.func.isRequired
}
