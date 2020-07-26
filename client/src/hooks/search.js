import { useState } from 'react'


export default function useSearch(fieldName, fetchMore) {
  const [name, setName] = useState('')
  const fetchByName = name => {
    fetchMore({
      variables: { [fieldName]: name },
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

  return {
    name,
    handleSearch,
    handleSearchNameChange
  }
}
