import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { 
  Table, TableBody, TableCell, TableRow, TableHead,
  TableContainer, Paper, Button, Fab 
} from '@material-ui/core'

import { ALL_DIRECTORS } from './queries'
import DirectorForm from '../DirectorForm'


const Directors = () => {
  const { loading, error, data } = useQuery(ALL_DIRECTORS)

  // Modal Form State
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
