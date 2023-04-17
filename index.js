function goto(callback) {
    setTimeout(function() {
        window.history.replaceState(null, null, window.location.pathname);
    }, 0);
    if (callback) {
        callback();
    }
}
