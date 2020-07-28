import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { useMutation } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'
import { 
    Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button 
} from '@material-ui/core'

import { ADD_DIRECTOR, UPDATE_DIRECTOR } from './mutations'
import { ALL_DIRECTORS } from '../Directors/queries'


const DirectorForm = (props) => {
  const { open, setOpen, selectedValues, onCreated, onUpdated } = props

  const { register, errors, formState, handleSubmit } = useForm({
    mode: 'onSubmit'
  })

  const handleClose = () => setOpen(false)

  const [values, setValues] = useState(selectedValues)
  useEffect(() => {
    setValues(selectedValues)
  }, [selectedValues])


  const [addDirector] = useMutation(ADD_DIRECTOR, {
    update(cache, { data: { addDirector } }) {
      const { directors } = cache.readQuery({ query: ALL_DIRECTORS })
      cache.writeQuery({
        query: ALL_DIRECTORS,
        data: { directors: directors.concat([addDirector]) }
      })
    },
    onCompleted: () => onCreated()
  })
  const [updateDirector] = useMutation(UPDATE_DIRECTOR, {
    onCompleted: () => onUpdated()
  })

  const onSubmit = data => {
    const { id, name, age } = data

    if (!id) {
      addDirector({ 
        variables: {
          name,
          age: parseInt(age, 10) 
        } 
      })
    } else {
      updateDirector({
        variables: {
          id,
          name,
          age: parseInt(age, 10)
        }
      })
    }
    handleClose()
  }

  return(
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <DialogTitle>{ !values.id ? 'Add New Director' : 'Update Director'}</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="Name"
              name="name"
              
              inputRef={register({ required: true })}
              error={!!errors.name}
            />
          </div>
          <div>
            <TextField
              label="Age"
              name="age"
              type="number"
  
              inputRef={register({ required: true })}
              error={!!errors.age}
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

DirectorForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  selectedValues: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
  }),
  onCreated: PropTypes.func,
  onUpdated: PropTypes.func
}

DirectorForm.defaultProps = {
  onCreated() {},
  onUpdated() {}
}


export default DirectorForm
