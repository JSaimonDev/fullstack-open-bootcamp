import { useState } from 'react'

export const useField = (inputName) => {
    const [value, setValue] = useState('')
    
    const onChange = (event) => {
        setValue(event.target.value)
    }
    
    const reset = () => {
        setValue('')
    }

    const name = inputName
    
    return {
        value,
        onChange,
        name,
        reset
    }
    }