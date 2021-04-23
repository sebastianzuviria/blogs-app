import React, { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const { notification }  = useContext(NotificationContext)

  if(notification.message === '') {
    return null
  }

  return (
    <Alert 
    severity={notification.severity}
    >
      {notification.message}
    </Alert>
  )
}

export default Notification