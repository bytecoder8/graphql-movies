import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { 
  Table, TableBody, TableCell, TableRow, TableHead,
  TableContainer, Paper, Button, Fab 
} from '@material-ui/core'

import { ALL_MOVIES } from './queries'
import MovieForm from '../MoviesForm'
import MovieDeleteDialog from '../MovieDeleteDialog/MovieDeleteDialog'


const Movies = () => {
  const { loading, error, data } = useQuery(ALL_MOVIES)

  // Modal Form State
  const [open, setOpen] = useState(false)

  const EMPTY_VALUES = { id: null, name: '', genre: '', directorId: '' }
  const [selectedValues, setSelectedValues] = useState(EMPTY_VALUES)

  const handleOpen = (event, movie = EMPTY_VALUES) => {
    setSelectedValues(movie)
    setOpen(true)
  }

  // Delete Modal State
  const [movieId, setMovieId] = useState(null)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>

  return(
    <div className="movies">
      <Fab color="primary" onClick={handleOpen}>Add</Fab>
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
            {data.movies.map( movie => (
              <TableRow key={ movie.id }>
                <TableCell>{ movie.name }</TableCell>
                <TableCell>{ movie.genre }</TableCell>
                <TableCell>{ movie.directorId }</TableCell>
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
      <MovieForm open={open} setOpen={setOpen} selectedValues={ selectedValues } />
      <MovieDeleteDialog movieId={movieId} setMovieId={setMovieId} />
    </div>
  )
}

export default Movies
