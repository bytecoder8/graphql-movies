import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Fab } from '@material-ui/core'

import { ALL_DIRECTORS } from './queries'
import DirectorForm from '../DirectorForm'
import DirectorDeleteDialog from '../DirectorDeleteDialog'
import DirectorsTable from './DirectorsTable'
import DirectorsSearch from './DirectorsSearch'
import useSearch from '../../hooks/search'


const Directors = (props) => {
  const { classes } = props
  
  const { loading, error, data, fetchMore } = useQuery(ALL_DIRECTORS)

  const {
    name,
    handleSearch,
    handleSearchNameChange,
    fetchByField
  } = useSearch('name', fetchMore)

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
      <DirectorForm
        open={open}
        setOpen={setOpen}
        selectedValues={ selectedValues }
        onCreated={ e => name && fetchByField(name) }
        onUpdated={ e => name && fetchByField(name) }
      />
      <DirectorDeleteDialog directorId={directorId} setDirectorId={setDirectorId} />
    </div>
  )
}

export default Directors
