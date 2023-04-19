const WEB_SOCKET = Object.freeze({
    wss: new Array(0),
    Create: function(me, url) {
        let str;
        let ws;

        str = libjs.ToString(url);

        ws = new WebSocket(str);

        ws.onclose = (event) => {
            instance.exports.WebSocketOnClose(me, event);
        };

        ws.onerror = (event) => {
            instance.exports.WebSocketOnError(me, event);
        };

        ws.onmessage = (event) => {
            instance.exports.WebSocketOnMessage(me, event);
        };

        ws.onopen = (event) => {
            instance.exports.WebSocketOnOpen(me, event);
        };

        WEB_SOCKET.wss.push({ id: me, ws: ws });

        return 0x00;
    },
    Destroy: function(me) {
        let inx;
        let ws;

        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -1) {
            return 0x01;
        }

        ws = WEB_SOCKET.wss.splice(inx, 0x01)[0x00];

        ws.ws.close();

        return 0x00;
    },
    GetBinaryType: function(me, binaryType) {
        let inx;
        let ptr;

        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        ptr = libjs.FromString(WEB_SOCKET.wss[inx].ws.binaryType);

        if (ptr == 0x00) {
            return 0x01;
        }

        libjs.Dereference32(binaryType)[0x00] = ptr;

        return 0x00;
    },
    SetBinaryType: function(me, binaryType) {
        let inx;
        let str;

        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        str = libjs.ToString(binaryType);

        WEB_SOCKET.wss[inx].ws.binaryType = str;

        return 0x00;
    },
    GetBufferedAmount: function(me, bufferedAmount) {
        let inx;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        libjs.Dereference32(bufferedAmount)[0x00] = WEB_SOCKET.wss[inx].bufferedAmount;

        return 0x00;
    },
    GetExtensions: function(me, extensions) {
        let inx;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        ptr = libjs.FromString(WEB_SOCKET.wss[inx].ws.extensions);

        if (ptr == 0x00) {
            return 0x01;
        }

        libjs.Dereference32(extensions)[0x00] = ptr;

        return 0x00;
    },
    GetProtocol: function(me, protocol) {
        let inx;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        ptr = libjs.FromString(WEB_SOCKET.wss[inx].ws.protocol);

        if (ptr == 0x00) {
            return 0x01;
        }

        libjs.Dereference32(protocol)[0x00] = ptr;

        return 0x00;
    },
    GetReadyState: function(me, readyState) {
        let inx;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        libjs.Dereference16(readyState)[0x00] = WEB_SOCKET.wss[inx].ws.readyState;

        return 0x00;
    },
    GetURL: function(me, url) {
        let inx;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        ptr = libjs.FromString(WEB_SOCKET.wss[inx].ws.url);

        if (ptr == 0x00) {
            return 0x01;
        }

        libjs.Dereference32(url)[0x00] = ptr;

        return 0x00;
    },
    Close: function(me, code, reason) {
        let inx;
        let str;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }

        str = libjs.ToString(reason);

        WEB_SOCKET.wss[inx].ws.close(code, str);

        return 0x00;
    },
    Send: function(me, data, size) {
        let inx;
        let arr;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -0x01) {
            return 0x01;
        }
        
        arr = new Uint8Array(instance.exports.memory.buffer, data, size);
        WEB_SOCKET.wss[inx].ws.send(new TextDecoder().decode(arr)); // arr.buffer);

        return 0x00;
    }
});
