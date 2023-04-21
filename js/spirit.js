function printf(format) {
    const dv = new DataView(instance.exports.memory.buffer, format);
    let len;
    for(len = 0x00; dv.getUint8(len) != 0x00; ++len);
    const arr = new Uint8Array(instance.exports.memory.buffer, format, len);
    const dec = new TextDecoder();
    const str = dec.decode(arr);
    console.log(str);
}

const importObject = Object.freeze({
    module: { },
    env: {
        memory: new WebAssembly.Memory({ initial: 256 }),
        /********/
        /* libc */
        /********/
        printfExtern: printf,
        /*************/
        /* WebSocket */
        /*************/
        WebSocketCreate: WEB_SOCKET.Create,
        WebSocketDestroy: WEB_SOCKET.Destroy,
        WebSocketGetBinaryType: WEB_SOCKET.GetBinaryType,
        WebSocketSetBinaryType: WEB_SOCKET.SetBinaryType,
        WebSocketGetBufferedAmount: WEB_SOCKET.GetBufferedAmount,
        WebSocketGetExtensions: WEB_SOCKET.GetExtensions,
        WebSocketGetProtocol: WEB_SOCKET.GetProtocol,
        WebSocketGetReadyState: WEB_SOCKET.GetReadyState,
        WebSocketGetURL: WEB_SOCKET.GetURL,
        WebSocketClose: WEB_SOCKET.Close,
        WebSocketSend: WEB_SOCKET.Send,
        /**********/
        /* WebRTC */
        /**********/
        /* RTCPeerConnectionConfiguration */
        RTCPeerConnectionConfigurationCreate: WEB_RTC.RTC_PEER_CONNECTION_CONFIGURATION.Create,
        RTCPeerConnectionConfigurationDestroy: WEB_RTC.RTC_PEER_CONNECTION_CONFIGURATION.Destroy
    }
});

function load() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../wasm/index.wasm");
    xhr.responseType = "arraybuffer";

    xhr.onload = () => {
        if (xhr.status != 200) {
            console.error(`[${xhr.status}] : ${xhr.statusText}`);
            return;
        }

        onload(xhr.response);
    };

    xhr.onerror = () => {
        console.error(`[${xhr.status}] : ${xhr.statusText}`);
    };

    xhr.send();
}

let instance;

async function onload(response) {
    try {
        const wasm = await WebAssembly.instantiate(response, importObject);
        console.log(wasm);
        instance = wasm.instance;
        wasm.instance.exports._start();
    }
    catch (error) {
        console.log(error);
    }
}
