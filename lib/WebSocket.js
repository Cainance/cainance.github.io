const WEB_SOCKET = Object.freeze({
    webSockets: new Array(0),
    Create: function(me, url) {
        let webSocket;

        if (me == 0x00) {
            return 0x01;
        }

        webSocket = new WebSocket(url);

        WEB_SOCKET.webSockets.push(webSocket);

        me[0x00] = webSocket;

        return 0x00;
    },
    Destroy: function(me) {
        let inx;
        
        inx = WEB_SOCKET.webSockets.indexOf(me);

        if (inx == -1) {
            return 0x01;
        }

        WEB_SOCKET.webSockets.splice(inx, 0x01);

        return 0x00;
    }
});
