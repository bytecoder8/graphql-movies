import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ALL_MOVIES } from '../Movies/queries'


import { 
  Dialog, DialogActions, DialogTitle, DialogContentText,
  Button
} from '@material-ui/core'


export const REMOVE_MOVIE = gql`
  mutation removeMovie($id: ID!) {
    removeMovie(id: $id) {
      id
      name
      genre
      directorId
    }
  }
`

const MovieDeleteDialog = props => {
  const { movieId, setMovieId } = props

  const handleClose = () => setMovieId(null)

  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    refetchQueries: [{query: ALL_MOVIES}]
  })

  const handleSubmit = event => {
    event.preventDefault()
    removeMovie({
      variables: {
        id: movieId
      }
    })
    handleClose()
  }

  return(
    <Dialog open={ !!movieId } onClose={handleClose}>
      <DialogTitle>Deleting Movie</DialogTitle>
      <DialogContentText>
        Are you sure you want to delete this movie?
      </DialogContentText>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}


export default MovieDeleteDialog
