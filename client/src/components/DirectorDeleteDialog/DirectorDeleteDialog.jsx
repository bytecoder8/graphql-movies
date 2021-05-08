import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ALL_DIRECTORS } from '../Directors/queries'


import { 
  Dialog, DialogActions, DialogTitle, DialogContentText,
  Button, withStyles
} from '@material-ui/core'


export const REMOVE_DIRECTOR = gql`
  mutation removeDirector($id: ID!) {
    removeDirector(id: $id) {
      id
    }
  }
`

const styles = {
  body: {
    padding: '10px 15px'
  }
}


const DirectorDeleteDialog = props => {
  const { directorId, setDirectorId, onDeleted, classes } = props

  const handleClose = () => setDirectorId(null)

  const [removeDirector] = useMutation(REMOVE_DIRECTOR, {
    refetchQueries: [{query: ALL_DIRECTORS}],
    onCompleted() { onDeleted() }
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
      <DialogContentText className={classes.body}>
        Are you sure you want to delete this director?
      </DialogContentText>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

DirectorDeleteDialog.propTypes = {
  directorId: PropTypes.string.isRequired,
  setDirectorId: PropTypes.func.isRequired,
  onDeleted: PropTypes.func
}

DirectorDeleteDialog.defaultProps = {
  onDeleted() {}
}



export default withStyles(styles)(DirectorDeleteDialog)
