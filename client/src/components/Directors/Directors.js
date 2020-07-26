import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Fab } from '@material-ui/core'

import { ALL_DIRECTORS } from './queries'
import DirectorForm from '../DirectorForm'
import DirectorDeleteDialog from '../DirectorDeleteDialog'
import DirectorsTable from './DirectorsTable'
import DirectorsSearch from './DirectorsSearch'


const Directors = (props) => {
  const { classes } = props
  
  const { loading, error, data, fetchMore } = useQuery(ALL_DIRECTORS)

  const [name, setName] = useState('')

  const fetchByName = name => {
    fetchMore({
      variables: { name },
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult
    })
  }
  const handleSearch = ({ charCode, target: { value } }) => {
    if (charCode === 13) {
      fetchByName(value)
    }
  }
  const handleSearchNameChange = ({ target: { value } }) => {
    setName(value)
    if (value === '') {
      fetchByName(value)
    }
  }

  // Modal Form State
  const [open, setOpen] = useState(false)

  const EMPTY_VALUES = { id: null, name: '', age: '' }
  const [selectedValues, setSelectedValues] = useState(EMPTY_VALUES)

  const handleOpen = (event, director = EMPTY_VALUES) => {
    setSelectedValues(director)
    setOpen(true)
  }

  // Delete Modal State
  const [directorId, setDirectorId] = useState(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>

  return(
    <div className="directors">
      <div className={classes.wrapper}>
        <Fab color="primary" onClick={handleOpen} className={classes.fab}>Add</Fab>
        <DirectorsSearch
          handleChange={handleSearchNameChange}
          handleSearch={handleSearch}
          name={name}
        />
        <DirectorsTable directors={data.directors} handleOpen={handleOpen} setDirectorId={setDirectorId} />
      </div>
      <DirectorForm open={open} setOpen={setOpen} selectedValues={ selectedValues } />
      <DirectorDeleteDialog directorId={directorId} setDirectorId={setDirectorId} />
    </div>
  )
}

export default Directors
