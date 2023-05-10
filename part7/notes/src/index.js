import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notification'
import notesReducer from './reducers/notes'
import userSessionReducer from './reducers/user-session'
import userListReducer from './reducers/user-list'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notes: notesReducer,
    userSession: userSessionReducer,
    userList: userListReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)