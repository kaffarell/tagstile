import { Nfc, NfcNdefData } from "nativescript-nfc";

export function writeNfcTag(content: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        let nfc = await setup();

        if (nfc !== undefined) {
            nfc.writeTag({
                textRecords: [
                    {
                        id: [1],
                        text: content
                    },
                ]
            })
                .then(
                    function () {
                        resolve();
                    },
                    function (err) {
                        reject();
                    }
                );

        }
    });
}

export function readNfcTag(callback: (content: string[]) => void) {
    setup().then(nfc => {
        if (nfc !== undefined) {
            callListenerMethod(nfc, (content) => {
                callback(content);
            });
        } else {
            console.log('Error: setting up nfc');
            callback([]);
        }
    });
}

function setup(): Promise<Nfc | undefined> {
    return new Promise(async (resolve, reject) => {

        let nfc = new Nfc();
        try {
            let avail = await nfc.available()
            if (avail === false) {
                // Nfc is not available, but maybe we can activate it
                let on = await nfc.enabled();
                if (on) {
                    resolve(nfc)
                } else {
                    resolve(undefined);
                }
            } else {
                // Nfc is available and ready
                resolve(nfc);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function callListenerMethod(nfc: Nfc, callback: (content: string[]) => void) {
    nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
        if (data.message) {
            let response: string[] = [];
            for (let m in data.message) {
                let record = data.message[m];
                response.push(record.payloadAsString);
            }
            callback(response);
        } else {
            callback([]);
        }
    }, {
        // iOS-specific options
        stopAfterFirstRead: true,
        scanHint: "Scan a tag, baby!"
    }).then(() => {
        console.log("OnNdefDiscovered listener added");
    });
}