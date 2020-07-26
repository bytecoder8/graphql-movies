import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { 
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
  TextField, Select, Button, InputLabel, Checkbox, FormControlLabel
} from '@material-ui/core'


import { ALL_MOVIES } from '../Movies/queries'
import { ALL_DIRECTORS_SELECT } from './queries'
import { ADD_MOVIE, UPDATE_MOVIE } from './mutations'

import { ALL_DIRECTORS } from '../Directors/queries'


const MovieForm = (props) => {
  const { open, setOpen, selectedValues, onCreated, onUpdated } = props

  const directorsQuery = useQuery(ALL_DIRECTORS_SELECT)
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
  
  
  const handleClose = () => {
    setOpen(false)
    setValues(selectedValues)
  }
  const handleChange = event => {
    event.persist()
    setValues(prevState => {
      const { target: { name, type, checked, value } } = event
      const val = type === 'checkbox' ? checked : value
      return ({
        ...prevState,
        [name]: val
      })
    })
  }

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{query: ALL_MOVIES}, {query: ALL_DIRECTORS}],
    onCompleted: () => onCreated()
  })
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{query: ALL_MOVIES}, {query: ALL_DIRECTORS}],
    onCompleted: () => onUpdated()
  })

  const handleSubmit = event => {
    event.preventDefault()
    const { id, name, genre, directorId, watched } = values

    if (!id) {
      addMovie({ 
        variables: {
          name,
          genre,
          directorId,
          watched
        } 
      })
    } else {
      updateMovie({
        variables: {
          id,
          name,
          genre,
          directorId,
          watched
        }
      })
    }
    handleClose()
  }

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{ !values.id ? 'Add New Movie' : 'Update Movie' }</DialogTitle>
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
        <FormControlLabel
          control={<Checkbox checked={values.watched} value={true} onChange={handleChange} name="watched" />}
          label="Watched"
        />
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
    watched: PropTypes.bool.isRequired,
    onCreated: PropTypes.func,
    onUpdated: PropTypes.func
  })
}

MovieForm.defaultProps = {
  onCreated() {},
  onUpdated() {}
}


export default MovieForm
