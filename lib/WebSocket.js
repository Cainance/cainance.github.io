const WEB_SOCKET = Object.freeze({
    wss: new Array(0),
    Create: function(me, url) {
        let ws;

        ws = new WebSocket("ws://127.0.0.1:12345");

        WEB_SOCKET.wss.push({ id: me, ws: ws });

        return 0x00;
    },
    Destroy: function(me) {
        let inx;
        
        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -1) {
            return 0x01;
        }

        WEB_SOCKET.wss.splice(inx, 0x01);

        return 0x00;
    },
    GetBinaryType: function(me, binaryType) {
        let inx;
        let str;
        let buf;
        let ptr;
        let arr;
        let binaryType_;

        inx = WEB_SOCKET.wss.findIndex(ws => ws.id == me);

        if (inx == -1) {
            return 0x01;
        }

        str = WEB_SOCKET.wss[inx].ws.binaryType;

        buf = new TextEncoder().encode(str);
        ptr = instance.exports.malloc(buf.byteLength + 0x01);
        arr = new Uint8Array(instance.exports.memory.buffer, ptr, buf.byteLength + 0x01);
        arr.set(buf);

        binaryType_ = new Uint32Array(instance.exports.memory.buffer, binaryType, 0x01);
        binaryType_[0x00] = ptr;

        return 0x00;
    }
});
