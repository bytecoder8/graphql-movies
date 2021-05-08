import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ALL_MOVIES } from '../Movies/queries'
import { ALL_DIRECTORS } from '../Directors/queries'


import { 
  Dialog, DialogActions, DialogTitle, DialogContentText,
  Button, withStyles
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

const styles = {
  body: {
    padding: '10px 15px'
  }
}


const MovieDeleteDialog = props => {
  const { movieId, setMovieId, onDeleted, classes } = props

  const handleClose = () => setMovieId(null)

  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    refetchQueries: [{query: ALL_MOVIES}, {query: ALL_DIRECTORS}],
    onCompleted: () => onDeleted()
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
      <DialogContentText className={classes.body}>
        Are you sure you want to delete this movie?
      </DialogContentText>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

MovieDeleteDialog.propTypes = {
  movieId: PropTypes.string.isRequired,
  setMovieId: PropTypes.func.isRequired,
  onDeleted: PropTypes.func
}

MovieDeleteDialog.defaultProps = {
  onDeleted() {}
}


export default withStyles(styles)(MovieDeleteDialog)
