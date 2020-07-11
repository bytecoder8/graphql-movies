import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { 
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
  TextField, Select, Button, InputLabel
} from '@material-ui/core'


import { ALL_MOVIES } from '../Movies/queries'
import { ALL_DIRECTORS } from './queries'
import { ADD_MOVIE, UPDATE_MOVIE } from './mutations'

const MovieForm = (props) => {
  const { open, setOpen, selectedValues } = props

  const directorsQuery = useQuery(ALL_DIRECTORS)
  let directors = []

  const [values, setValues] = useState(selectedValues)
  useEffect(() => {
    setValues(selectedValues)
  }, [selectedValues])
  
  if (directorsQuery.data) {
    directors = directorsQuery.data.directors
    // set first director
    if (directors[0] && !values.directorId) {
      setValues( prevState => ({
        ...prevState, directorId: directors[0].id 
      }))
    }
  }
  
  
  const handleClose = () => setOpen(false)
  const handleChange = event => {
    event.persist()
    setValues(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: ALL_MOVIES }]
  })
  const [updateMovie] = useMutation(UPDATE_MOVIE)

  const handleSubmit = event => {
    event.preventDefault()
    const { id, name, genre, directorId } = values

    if (!id) {
      addMovie({ 
        variables: {
          name,
          genre,
          directorId
        } 
      })
    } else {
      updateMovie({
        variables: {
          id,
          name,
          genre,
          directorId
        }
      })
    }
    handleClose()
  }

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new movie</DialogTitle>
      <DialogContent>
        <TextField label="name" name="name" value={values.name} onChange={handleChange} />
        <TextField label="genre" name="genre" value={values.genre} onChange={handleChange} />
        <FormControl>
          <InputLabel htmlFor="director-native-helper">Director</InputLabel>
          <Select
            native
            onChange={handleChange}
            name="directorId"
            inputProps={{
              id: 'director-native-helper',
              value: values.directorId
            }}
          >
            {directors.map(director => (
              <option key={director.id} value={director.id}>{director.name}</option>)
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

MovieForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  selectedValues: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    directorId: PropTypes.string.isRequired,
  })
}


export default MovieForm