var EXPORTED_SYMBOLS = ['notification_template', 'notify']

notification_template = {
  "Basic": {
    title: "Basic Notification",
    body: "Short message given here."
  }, 
  "Item Drop": {
    title: "Dropped Item",
    body: "Item has been dropped"
  }
}

notify = function (type) {
  new Notification(notification_template[type].title, notification_template[type].options)
}