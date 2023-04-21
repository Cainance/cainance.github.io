const WEB_RTC = Object.freeze({
    RTC_PEER_CONNECTION_CONFIGURATION: Object.freeze({
        kvps: {},
        Create: function(me) {

            this.kvps[me] = {
                bundlePolicy: "balanced",
                certificates: null,
                iceCandidatePoolSize: 0x00,
                iceServers: null,
                iceTransportPolicy: "all",
                peerIdentity: null,
                rtcpMuxPolicy: "require"
            };
            
            return 0x00;
        },
        Destroy: function(me) {
            if (!(me in this.kvps)) {
                return 0x01;
            }

            delete this.kvps[me];

            return 0x00;
        },
        GetBundlePolicy: function(me, bundlePolicy) {
            let ptr;

            if (!(me in this.kvps)) {
                return 0x01;
            }

            ptr = libjs.FromString(this.kvps[me].bundlePolicy);

            libjs.Dereference32(bundlePolicy)[0x00] = ptr;

            return 0x00;
        },
        SetBundlePolicy: function(me, bundlePolicy) {
            let str;

            if (!(me in this.kvps)) {
                return 0x01;
            }

            str = libjs.ToString(bundlePolicy);

            this.kvps[me].bundlePolicy = str;

            return 0x00;
        },
        GetCertificates: function(me, certificates) {
            let certificate;

            if (!(me in this.kvps)) {
                return 0x01;
            }



            // return a NIL (0) terminated array of certificates

            return 0x00;
        },
        SetCertificates: function(me, certificates) {
            let certificate;
            let certificates_;

            if (!(me in this.kvps)) {
                return 0x01;
            }

            certificates_ = new Array(0x00);

            do {
                certificate = libjs.Dereference32(certificates);

                certificates_.push(certificate);

                certificates += 4;
            } while(certificate != 0x00);

            this.kvps[me].certificates = certificates_;
            
            return 0x00;
        }
    })
});
