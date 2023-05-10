import { createSlice } from '@reduxjs/toolkit'

const userSessionSlice = createSlice({
  name: 'userSession',
  initialState: null,
  reducers: {
    setUserSession(state, action) {
      return action.payload
    }
  }
})

export default userSessionSlice.reducer
export const { setUserSession } = userSessionSlice.actions