import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gql }  from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { ALL_DIRECTORS } from '../Directors/queries'


const ADD_DIRECTOR = gql`
  mutation addDirector($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      id
      name
      age

      movies {
        id
      }
    }
  }
`

const DirectorForm = (props) => {
  const { open, setOpen } = props

  const handleClose = () => setOpen(false)

  const [values, setValues] = useState({})
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const [addDirector] = useMutation(ADD_DIRECTOR, {
    update(cache, { data: { addDirector } }) {
      const { directors } = cache.readQuery({ query: ALL_DIRECTORS })
      cache.writeQuery({
        query: ALL_DIRECTORS,
        data: { directors: directors.concat([addDirector]) }
      })
    }
  })

  const handleSubmit = event => {
    event.preventDefault()
    const { name, age } = values
    addDirector({ 
      variables: {
        name,
        age: parseInt(age, 10) 
      } 
    })
    handleClose()
  }

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new director</DialogTitle>
      <DialogContent>
        <TextField label="name" name="name" onChange={handleChange}></TextField>
        <TextField label="age" name="age" onChange={handleChange}></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

DirectorForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default DirectorForm