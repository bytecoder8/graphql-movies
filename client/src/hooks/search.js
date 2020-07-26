import { useState } from 'react'


export default function useSearch(fieldName, fetchMore) {
  const [name, setName] = useState('')
  const fetchByField = name => {
    fetchMore({
      variables: { [fieldName]: name },
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult
    })
  }
  const handleSearch = ({ charCode, target: { value } }) => {
    if (charCode === 13) {
      fetchByField(value)
    }
  }
  const handleSearchNameChange = ({ target: { value } }) => {
    setName(value)
    if (value === '') {
      fetchByField(value)
    }
  }

  return {
    [fieldName]: name,
    handleSearch,
    handleSearchNameChange,
    fetchByField
  }
}
