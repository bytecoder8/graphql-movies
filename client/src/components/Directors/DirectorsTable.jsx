import React from 'react'
import PropTypes from 'prop-types'
import { 
  Table, TableBody, TableCell, TableRow, TableHead,
  TableContainer, Paper, Button, withStyles
} from '@material-ui/core'


const styles = {
  editButton: {
    marginRight: '5px'
  }
}

function DirectorsTable(props) {
  const { directors, handleOpen, setDirectorId, classes } = props

  return(
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
          {directors.map( director => (
            <TableRow key={director.id}>
              <TableCell>{ director.name }</TableCell>
              <TableCell>{ director.age }</TableCell>
              <TableCell>{ director.movies.map(movie => movie.name).join(', ') }</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={event => handleOpen(event, director)} className={classes.editButton}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={event => setDirectorId(director.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

DirectorsTable.propTypes = {
  directors: PropTypes.arrayOf(PropTypes.any),
  handleOpen: PropTypes.func.isRequired,
  setDirectorId: PropTypes.func.isRequired
}

export default withStyles(styles)(DirectorsTable)
