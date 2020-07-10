import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ALL_DIRECTORS } from '../Directors/queries'


import { 
  Dialog, DialogActions, DialogTitle, DialogContentText,
  Button
} from '@material-ui/core'


export const REMOVE_DIRECTOR = gql`
  mutation removeDirector($id: ID!) {
    removeDirector(id: $id) {
      id
    }
  }
`

const DirectorDeleteDialog = props => {
  const { directorId, setDirectorId } = props

  const handleClose = () => setDirectorId(null)

  const [removeDirector] = useMutation(REMOVE_DIRECTOR, {
    refetchQueries: [{query: ALL_DIRECTORS}]
  })

  const handleSubmit = event => {
    event.preventDefault()
    removeDirector({
      variables: {
        id: directorId
      }
    })
    handleClose()
  }

  return(
    <Dialog open={ !!directorId } onClose={handleClose}>
      <DialogTitle>Deleting Director</DialogTitle>
      <DialogContentText>
        Are you sure you want to delete this director?
      </DialogContentText>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}


export default DirectorDeleteDialog
