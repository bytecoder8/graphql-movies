import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Fab } from '@material-ui/core'

import { ALL_MOVIES } from './queries'
import { UPDATE_MOVIE } from '../MoviesForm/mutations'
import { EMPTY_MOVIE } from '../../constants'
import MoviesTable from './MoviesTable'
import MovieForm from '../MoviesForm'
import MovieDeleteDialog from '../MovieDeleteDialog'
import MoviesSearch from './MoviesSearch'
import useSearch from '../../hooks/search'


const Movies = (props) => {
  const { classes } = props

  const { loading, error, data, fetchMore } = useQuery(ALL_MOVIES)

  const {
    name,
    handleSearch,
    handleSearchNameChange,
    fetchByField
  } = useSearch('name', fetchMore)

  // Modal Form State
  const [open, setOpen] = useState(false)

  const [selectedValues, setSelectedValues] = useState(EMPTY_MOVIE)

  const handleOpen = (event, movie = EMPTY_MOVIE) => {
    setSelectedValues(movie)
    setOpen(true)
  }

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{query: ALL_MOVIES}]
  })

  const handleClickWatched = (id, watched) => {
    updateMovie({
      variables: {
        id,
        watched
      }
    })
  }

  // Delete Modal State
  const [movieId, setMovieId] = useState(null)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>

  return(
    <div className="movies">
      <div className={classes.wrapper}>
        <Fab className={classes.fab} color="primary" onClick={handleOpen}>Add</Fab>
        <MoviesSearch
          handleChange={handleSearchNameChange}
          handleSearch={handleSearch}
          name={name}
        />
        <MoviesTable
          movies={data.movies}
          handleOpen={handleOpen}
          setMovieId={setMovieId}
          handleClickWatched={handleClickWatched}
        />
      </div>
      <MovieForm
        open={open}
        setOpen={setOpen}
        selectedValues={ selectedValues }
        onCreated={ e => name && fetchByField(name) }
        onUpdated={ e => name && fetchByField(name) }
      />
      <MovieDeleteDialog movieId={movieId} setMovieId={setMovieId} />
    </div>
  )
}

export default Movies
