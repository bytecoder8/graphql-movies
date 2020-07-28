import React from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { 
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl,
  TextField, Select, Button, InputLabel, Checkbox, FormControlLabel
} from '@material-ui/core'

import { useForm } from 'react-hook-form'


import { ALL_MOVIES } from '../Movies/queries'
import { ALL_DIRECTORS_SELECT } from './queries'
import { ADD_MOVIE, UPDATE_MOVIE } from './mutations'

import { ALL_DIRECTORS } from '../Directors/queries'


const MovieForm = (props) => {
  const { open, setOpen, selectedValues, onCreated, onUpdated } = props

  const { register, errors, formState, handleSubmit } = useForm({
    mode: 'onSubmit'
  })

  const directorsQuery = useQuery(ALL_DIRECTORS_SELECT)
  let directors = []

  if (directorsQuery.data) {
    directors = directorsQuery.data.directors
  }
  
  
  const handleClose = () => {
    setOpen(false)
  }


  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{query: ALL_MOVIES}, {query: ALL_DIRECTORS}],
    onCompleted: () => onCreated()
  })
  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{query: ALL_MOVIES}, {query: ALL_DIRECTORS}],
    onCompleted: () => onUpdated()
  })

  const onSubmit = data => {
    const { id } = selectedValues
    const { name, genre, directorId, watched } = data

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
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <DialogTitle>{ !selectedValues.id ? 'Add New Movie' : 'Update Movie' }</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Name"
              name="name"
              defaultValue={selectedValues.name}
              inputRef={register({ required: true })}
              error={!!errors.name}
            />
          </div>
          <div>
            <TextField
              label="Genre"
              name="genre"
              defaultValue={selectedValues.genre}
              inputRef={register({ required: true })}
              error={!!errors.genre}
            />
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="director-native-helper">Director</InputLabel>
              <Select
                native
                name="directorId"
                inputProps={{
                  id: 'director-native-helper',
                }}
                inputRef={register({ required: true })}
                error={!!errors.directorId}
                defaultValue={selectedValues.directorId}
              >
                {directors.map(director => (
                  <option key={director.id} value={director.id}>{director.name}</option>)
                )}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox name="watched" inputRef={register} defaultChecked={selectedValues.watched} />}
              label="Watched"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            color="primary"
            disabled={ formState.isSubmitting }
          >Submit</Button>
        </DialogActions>
      </form>
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
