const libjs = Object.freeze({
    ToString: function(ptr) {
        let dat;
        let len;
        let arr;
        let dec;
        let str;

        dat = new DataView(instance.exports.memory.buffer, ptr);
        for(len = 0x00; dat.getUint8(len) != 0x00; ++len);
        arr = new Uint8Array(instance.exports.memory.buffer, ptr, len);
        dec = new TextDecoder();
        str = dec.decode(arr);

        return str;
    },
    FromString: function(str) {
        let enc;
        let buf;
        let ptr;
        let arr;

        enc = new TextEncoder();
        buf = enc.encode(str);
        ptr = instance.exports.malloc(buf.byteLength + 0x01);
        if (ptr != 0x00) {
            arr = new Uint8Array(instance.exports.memory.buffer, ptr, buf.byteLength + 0x01);
            arr.set(buf);
        }

        return ptr;
    },
    Dereference32: function(ptr) {
        return new Uint32Array(instance.exports.memory.buffer, ptr, 0x01);
    },
    Dereference16: function(ptr) {
        return new Uint16Array(instance.exports.memory.buffer, ptr, 0x01);
    }
});
