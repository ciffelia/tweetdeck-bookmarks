const showNotification = (message, type = 'info') => {
  const TDNotifications = mR.findModule('showNotification')[0]

  if (type === 'info') {
    TDNotifications.showNotification({ message })
  } else if (type === 'error') {
    TDNotifications.showErrorNotification({ message })
  } else {
    throw new Error(`Unknown notification type: ${type}`)
  }
}

export default showNotification
