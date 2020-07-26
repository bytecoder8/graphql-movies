import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'


export default function MoviesSearch(props) {
  const { handleChange, handleSearch, name } = props

  return(
    <TextField
      label="Search"
      placeholder="Type name..."
      onChange={ handleChange }
      onKeyPress={ handleSearch }
      value={ name }
    />
  )
}

MoviesSearch.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}
