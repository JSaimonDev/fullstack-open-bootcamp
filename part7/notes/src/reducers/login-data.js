import { createSlice } from '@reduxjs/toolkit'

const loginDataSlice = createSlice({
  name: 'loginData',
  initialState: { username: '', password: '' },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    },
    resetLoginData(state) {
      state.username = ''
      state.password = ''
    }
  }
})

export default loginDataSlice.reducer
export const { setUsername, setPassword, resetLoginData } = loginDataSlice.actions