import { createContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return { message: action.message, visibility: true }
      case 'CLEAR_NOTIFICATION':
        return { message: null, visibility: false }
      default:
        return state
    }
  }

export const NotificationProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, { message: null, visibility: false })

    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;