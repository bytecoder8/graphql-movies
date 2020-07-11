import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Fab } from '@material-ui/core'

import { ALL_MOVIES } from './queries'
import MoviesTable from './MoviesTable'
import MovieForm from '../MoviesForm'
import MovieDeleteDialog from '../MovieDeleteDialog'


const Movies = (props) => {
  const { classes} = props
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
      <div className={classes.wrapper}>
        <Fab className={classes.fab} color="primary" onClick={handleOpen}>Add</Fab>
        <MoviesTable movies={data.movies} handleOpen={handleOpen} setMovieId={setMovieId} />
      </div>
      <MovieForm open={open} setOpen={setOpen} selectedValues={ selectedValues } />
      <MovieDeleteDialog movieId={movieId} setMovieId={setMovieId} />
    </div>
  )
}

export default Movies