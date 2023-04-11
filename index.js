function defrag(callback) {
    setTimeout(function() {
        window.history.replaceState(null, null, window.location.pathname);
    }, 0);
    if (callback) {
        callback();
    }
}

function register() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() { 
            navigator.serviceWorker.register("serviceWorker.js");
        });
    }
}

function play() {
    let xhr;
    
    xhr = new XMLHttpRequest();
    xhr.open("GET", "index.wasm");
    xhr.responseType = "arraybuffer";
    xhr.onload = () => {
        if (xhr.status == 200) {
            success(xhr.response);
        }
        else {
            console.error("Failed to load url.");
        }
    };
    xhr.onerror = () => {
        console.error("Failed to load url.");
    };
    xhr.send();
}

async function success(response) {
    try {
        console.log(response);
        const wasm = await WebAssembly.instantiate(response, {});
        const instance = wasm.instance;
        console.log(instance);
        /* call _start(), this will then initialize itself internally
           and communicate with javascript for any dependencies,
           such as webrtc and webgl */
    }
    catch (error) {
        console.error(error);
    }
}
