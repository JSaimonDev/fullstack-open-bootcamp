import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    visible: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload
            state.visible = true
        },
        hideNotification: (state, action) => {
            state.visible = false
        }
    }
})

export default notificationSlice.reducer
export const {setNotification, hideNotification} = notificationSlice.actions

export const setNotificationAsync = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())
        } , time * 1000)
    }
}