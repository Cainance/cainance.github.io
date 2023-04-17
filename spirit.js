const importObject = Object.freeze({
    module: { },
    env: {
        memory: new WebAssembly.Memory({ initial: 256 }),
        /* WebSocket */
        WebSocketCreate: WEB_SOCKET.Create,
        WebSocketDestroy: WEB_SOCKET.Destroy,
    }
});

function load() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "index.wasm");
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

async function onload(response) {
    try {
        const wasm = await WebAssembly.instantiate(response, importObject);
        console.log(wasm);
        wasm.instance.exports._start();
    }
    catch (error) {
        console.log(error);
    }
}
