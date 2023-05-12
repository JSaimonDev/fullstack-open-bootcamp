import { Alert } from '@mui/material'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      <Alert>
        {message}
      </Alert>
    </div>
  )
}

export default Notification