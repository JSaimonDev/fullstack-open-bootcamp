import { createSlice } from '@reduxjs/toolkit'

const userListReducer = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    initializeUserList(state, action) {
      return action.payload
    },
  }

})

export default userListReducer.reducer
export const { initializeUserList } = userListReducer.actions