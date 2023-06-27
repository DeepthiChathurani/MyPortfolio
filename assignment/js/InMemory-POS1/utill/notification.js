function showNotification(message, type) {
    var notification = $('#notification');

    // Set notification message and class based on the type
    notification.text(message);
    notification.removeClass().addClass(type);

    // Show the notification
    notification.fadeIn(300).delay(2000).fadeOut(400);
}