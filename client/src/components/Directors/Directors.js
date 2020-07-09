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

  const handleOpen = () => setOpen(true)


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
            {data.directors.map( ({ id, name, age, movies }) => (
              <TableRow key={id}>
                <TableCell>{ name }</TableCell>
                <TableCell>{ age }</TableCell>
                <TableCell>{ movies.map(movie => movie.name).join(', ') }</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={handleOpen}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DirectorForm open={open} setOpen={setOpen} />
    </div>
  )
}

export default Directors
