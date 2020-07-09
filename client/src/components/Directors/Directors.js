import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'

import { ALL_DIRECTORS } from './queries'
import DirectorForm from '../DirectorForm'


const Directors = () => {
  const { loading, error, data } = useQuery(ALL_DIRECTORS)
  const [open, setOpen] = useState(false)

  const EMPTY_VALUES = { id: null, name: '', age: '' }
  const [selectedValues, setSelectedValues] = useState(EMPTY_VALUES)

  const handleOpen = (event, director = EMPTY_VALUES) => {
    setSelectedValues(director)
    setOpen(true)
  }


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.toString()}</p>


  return(
    <div className="directors">
      <Fab color="primary" onClick={handleOpen}>Add</Fab>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Movies</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.directors.map( director => (
              <TableRow key={director.id}>
                <TableCell>{ director.name }</TableCell>
                <TableCell>{ director.age }</TableCell>
                <TableCell>{ director.movies.map(movie => movie.name).join(', ') }</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={event => handleOpen(event, director)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DirectorForm open={open} setOpen={setOpen} selectedValues={ selectedValues } />
    </div>
  )
}

export default Directors
