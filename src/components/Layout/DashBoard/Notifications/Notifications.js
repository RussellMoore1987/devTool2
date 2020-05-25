// notification creator
export function NotificationsCreator(notifications = []) {
  // @ is array start
    // ? this function should be called something like this, and past these types of variables. [{},{}] or[{}]
    // NotificationsCreator([
    //   {type:"error", message:"This is what an error message looks like."},
    //   {type:"success", message:"This is what a success message looks like."}
    // ]);
    // check to make sure we were given an array
    if (Array.isArray(notifications)) {
      // # creating some main variables
        // find the notifications class
        const notificationsContainer = document.querySelector('.notifications');
        // create counter, to help out with clear all button
        let counter = 0;
        // notification timer, if you'd like the messages to stay longer use a higher number, in milliseconds, default 4000
        const notificationTimer = 4000;
      // @ create notifications start
        // loop over and create notifications
        for (let i = 0; i < notifications.length; i++) {
          // # main variables for each notification
            // set up local variables
            const notificationType = notifications[i]['type'];
            const notificationMessage = notifications[i]['message'];
          // # build out notification pieces
            // # notification
              const notification = document.createElement('div');
              notification.classList.add('notification');
              // add count and block data sets
              notification.dataset.counter = notificationTimer;
              notification.dataset.block = 'false';
              // add notification animation delay
              notification.style.animationDelay = (i * 300) + 'ms';
              // # add event handler for time bar
                // mouse over
                notification.onmouseover = (e) => {
                  const notification = e.target;
                  // block counter
                  notification.dataset.block = true;
                  // reset counter
                  notification.dataset.counter = notificationTimer;
                }
                // mouse leave
                notification.onmouseleave = (e) => {
                  const notification = e.target;
                  // unblock counter
                  notification.dataset.block = false;
                }
                // create an event
                const notificationCreated = new CustomEvent("created");
                // add the event listener
                notification.addEventListener("created", (e) => { 
                  // get notification
                  const notification = e.target;
                  // set interval speed
                  const intervalSpeed = 10;
                  // get time bar
                  const timerBar = notification.querySelector('.timer-bar');
                  // set interval
                  let x = setInterval(() => {
                    // get notification timing count
                    let counter = notification.dataset.counter;
                    // get the variable for whether or not it's blocked
                    let blocked = notification.dataset.block;
                    // get the percentage the time bar should be at
                    const timerBarPercentage = (counter / notificationTimer) * 100;
                    // change the time bar
                    timerBar.style.width = timerBarPercentage + '%';
                    // check to see if the notification is blocked, if you are hovering over the notification, it blocks the timer
                    if (blocked === 'false') {
                      // minus the interval, this is what runs the countdown of the timing bar
                      counter -= intervalSpeed;
                      // set the notification with the decreased time
                      notification.dataset.counter = counter;
                      // get a count of notifications
                      const notificationCount = notificationsContainer.querySelectorAll('.notification').length;
                      // check the time and see if it is at zero, also check the notifications if there are none left stop the interval process
                      if (counter <= 0) {
                        // stop the interval process
                        clearInterval(x);
                        // click the close button
                        notification.querySelector('.fa-times').click();
                      } else if (notificationCount <= 0) {
                        // stop the interval process, notifications are already gone
                        clearInterval(x);
                      }
                    }
                  }, intervalSpeed);
                });
                // ? resources in helping build the timing functionality
                  // ? https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
                  // ? https://www.w3schools.com/howto/howto_js_countdown.asp
            // # notification type icon (error, success)
              // make icon
              const icon = document.createElement('i');
              // check to see if it is a success message or error message
              if (notificationType === 'success') {
                notification.classList.add('success-notification');
                icon.classList.add('fas', 'fa-check');
              } else {
                notification.classList.add('error-notification');
                icon.classList.add('fas', 'fa-exclamation-triangle');
              }
            // # notification message
              // make message
              const span = document.createElement('span');
              span.innerHTML = notificationMessage;
            // # notification close button
              // make close button
              const closeIcon = document.createElement('i');
              closeIcon.classList.add('fas', 'fa-times');
              // add event handler on close button
              closeIcon.onclick = (e) => {
                // TODO: remove event listeners
                // get notification
                const notification = e.target.closest('.notification');
                // exiting animation, change opacity and size
                notification.style.animationDelay = '0ms';
                notification.classList.add('notificationLeave');
                // check to see how many notifications are left and whether or not the clear all button is there, do logic accordingly
                const clearAllButton = document.querySelector('.clear-all');
                // is the button there
                if (clearAllButton !== null) {
                  // is the notification count under 2, if so remove the button
                  const notificationCount = notificationsContainer.querySelectorAll('.notification').length;
                  // with the way that the logic works when the counter is 1 remove the clear all button because we have no notifications left
                  if (notificationCount < 2) {
                    // perform animation for clear all button
                    clearAllButton.classList.remove('fade-in'); 
                    clearAllButton.style.opacity = 1; 
                    clearAllButton.classList.add('fade-out'); 
                    // remove clear all button
                    setTimeout(() => {
                      clearAllButton.remove();
                    }, 1000);
                  } else {
                    setTimeout(() => {
                      // check again to see if there are any notifications left. Sometimes when the notifications leave all at once it counts them just before they are removed and therefore does not remove the clear all button
                      // notification count
                      const notificationCount = notificationsContainer.querySelectorAll('.notification').length;
                      // how many are left, follows logic above
                      if (notificationCount < 2) {
                        // perform animation for clear all button
                        clearAllButton.classList.remove('fade-in'); 
                        clearAllButton.style.opacity = 1; 
                        clearAllButton.classList.add('fade-out'); 
                        // remove button
                        setTimeout(() => {
                          clearAllButton.remove();
                        }, 1000);
                      }
                    }, 1000);
                  }
                }
                // set timeout then remove the notification
                setTimeout(() => {
                  notification.remove();
                }, 1000);
              };
            // # notification timer bar
              // make timer bar
              const timerBar = document.createElement('div');
              timerBar.classList.add('timer-bar');
          // # put notification together, and make necessary calls
            notification.appendChild(icon);
            notification.appendChild(span);
            notification.appendChild(closeIcon);
            notification.appendChild(timerBar);
            // start the timing bar
            notification.dispatchEvent(notificationCreated);
            // add notification to notifications container
            notificationsContainer.appendChild(notification);
          // # increment counter
            counter++;
        }
      // @ create notifications end

      // @ clear all button start
        // get existing notification count
        const notificationCount = notificationsContainer.querySelectorAll('.notification').length;
        // check to see if the clear all button is already there if it is don't worry about it, don't create a new button
        const clearAllButton = document.querySelector('.clear-all');
        // check to see how many messages were created (counter), if more than two set the clear all button. Also check to see if the count of notifications is already higher than two
        // check to see if we need to create a clear all button
        if ((counter > 2 || notificationCount > 2) && clearAllButton === null) {
          // make the clear all button
          const clearAllButton = document.createElement('div');
          clearAllButton.classList.add('clear-all','fade-in');
          clearAllButton.innerHTML = '<span>Clear All</span>'; 
          // add event handler to clear all
          clearAllButton.onclick = function (e) {
            // perform animation
            this.classList.remove('fade-in'); 
            this.style.opacity = 1; 
            this.classList.add('fade-out'); 
            // find all notifications and close them
            const notification_array = document.querySelectorAll('.notification');
            // loop over notifications and close them
            for (let i = 0; i < notification_array.length; i++) {
              notification_array[i].querySelector('.fa-times').click();
            }
            setTimeout(() => {
              // permanently remove the clear all button
              this.remove();
            }, 1000);
          };
          // add clear button
          notificationsContainer.appendChild(clearAllButton); 
        }
      // @ clear all button end
    } else {
      console.log('Error, notification creator was not passed an array.');
    }
  // @ is array end
}