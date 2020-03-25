// notification creator
export function NotificationsCreator(notifications = []) {
  // find the notifications class
  const notificationsContainer = document.querySelector('.notifications');
  // check to make sure we are given an array
  if (Array.isArray(notifications)) {
    // loop over and create notifications
    for (let i = 0; i < notifications.length; i++) {
      // set up local variables
      const notificationType = notifications[i]['type'];
      const notificationMessage = notifications[i]['message'];
      const notificationDuration = notifications[i]['duration'];
      // build out notification
      const notification = document.createElement('div');
      notification.classList.add('notification');
      // make and add icon
      const icon = document.createElement('i');
      // check to see if it is a success message or error message
      if (notificationType === 'success') {
        notification.classList.add('success-notification');
        icon.classList.add('fas', 'fa-check');
      } else {
        notification.classList.add('error-notification');
        icon.classList.add('fas', 'fa-exclamation-triangle');
      }
      notification.appendChild(icon)
      // make and add message
      const span = document.createElement('span');
      span.innerHTML = notificationMessage;
      notification.appendChild(span)
      // make and add close button
      const closeIcon = document.createElement('i');
      closeIcon.classList.add('fas', 'fa-times');
      // add event handler close
      closeIcon.onclick = function (e) {
        // change opacity and size
        const notification = e.target.closest('.notification')
        notification.style.opacity = 0;
        // set timeout then remove
        setTimeout(() => {
          notification.remove();
        }, 500);
      };
      notification.appendChild(closeIcon);
      // make and add timer bar
      const timerBar = document.createElement('div');
      timerBar.classList.add('timer-bar');
      // add event handler timer

      notification.appendChild(timerBar);
      // add notification
      console.log(notification);
      console.log(notificationsContainer);
      notificationsContainer.appendChild(notification);
    }
  } else {
    console.log('Error, Notifications were not passed an array.');
  }
}