// notification creator
export function NotificationsCreator(notifications = []) {
  // find the notifications class
  const notificationsContainer = document.querySelector('.notifications');
  // check to make sure we are given an array
  if (Array.isArray(notifications)) {
    // create counter
    let counter = 0;
    // loop over and create notifications
    for (let i = 0; i < notifications.length; i++) {
      // set up local variables
      const notificationType = notifications[i]['type'];
      const notificationMessage = notifications[i]['message'];
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
        const notification = e.target.closest('.notification');
        notification.style.animationDelay = '0ms';
        notification.classList.add('notificationLeave');
        // check to see how many notifications are left and whether or not the clear all button is there, do logic accordingly
        const clearAllButton = document.querySelector('.clear-all');
        // is the button there
        if (clearAllButton !== null) {
          // is the notification account under 2, if so remove the button
          const notificationCount = notificationsContainer.querySelectorAll('.notification').length;
          // with the way that the logic works when the counter is 1 remove the clear all button because we have no notifications left
          if (notificationCount < 2) {
            // perform animation
            clearAllButton.classList.remove('fade-in'); 
            clearAllButton.style.opacity = 1; 
            clearAllButton.classList.add('fade-out'); 
            // remove button
            setTimeout(() => {
              clearAllButton.remove();
            }, 1000);
          }
        }
        // set timeout then remove
        setTimeout(() => {
          notification.remove();
        }, 1000);
      };
      notification.appendChild(closeIcon);
      // make and add timer bar
      const timerBar = document.createElement('div');
      timerBar.classList.add('timer-bar');
      // add event handler timer
      // ...........
      // ? https://www.w3schools.com/howto/howto_js_countdown.asp
      // ? https://www.cssscript.com/demo/push-notification-notifier/
      notification.appendChild(timerBar);
      // add notification animation delay
      notification.style.animationDelay = (i * 300) + 'ms';
      // add notification
      notificationsContainer.appendChild(notification);
      // increment counter
      counter++;
    }
    // check to see how many messages were created, if more than two set the clear all button
    // also check to see if the account is already higher than two
    const notificationCount = notificationsContainer.querySelectorAll('.notification').length;
    
    if (counter > 2 || notificationCount > 2) {
      // make clear all button
      const clearAllButton = document.createElement('div');
      clearAllButton.classList.add('clear-all','fade-in');
      clearAllButton.innerHTML = '<span>Clear All</span>'; 
      // add event handler clear all
      clearAllButton.onclick = function (e) {
        // perform animation
        this.classList.remove('fade-in'); 
        this.style.opacity = 1; 
        this.classList.add('fade-out'); 
        // find all notifications and close them
        const notification_array = document.querySelectorAll('.notification');
        // over notifications and close them
        for (let i = 0; i < notification_array.length; i++) {
          notification_array[i].querySelector('.fa-times').click();
        }
        setTimeout(() => {
          this.remove();
        }, 1000);
      };
      // that clear button
      notificationsContainer.appendChild(clearAllButton); 
    }
  } else {
    console.log('Error, Notifications were not passed an array.');
  }
}