import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: 0,
    reducers: {
        applyFilter: (state, action) => {
            return action.payload
        }
    }
})

export default filterSlice.reducer
export const {applyFilter} = filterSlice.actions