import { useState } from 'react'


export const useInput = initialValue => {
  const [value, setValue] = useState(initialState)

  return {
    value,
    setValue
  }
}

export default useInput
