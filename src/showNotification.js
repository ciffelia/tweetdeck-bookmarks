const TDNotifications = mR.findModule('showNotification')[0]

const showNotification = (message, type = 'info') => {
  if (type === 'info') {
    TDNotifications.showNotification({ message })
  } else if (type === 'error') {
    TDNotifications.showErrorNotification({ message })
  } else {
    throw new Error(`Unknown notification type: ${type}`)
  }
}

export default showNotification
