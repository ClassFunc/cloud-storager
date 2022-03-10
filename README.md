# Cloud Storager

## Save uploaded files to bucket for Firebase & Google Cloud Storage

## Install:

```shell
npm i -S cloud-storager
or
yarn add cloud-storager
```

## Usage:

```js
const {initializeApp} = require('firebase-admin/app');
const {getStorage} = require('firebase-admin/storage');
const cloudStorager = require('cloud-storager');
const app = initializeApp();
const storage = getStorage(app);
const bucket = storage.bucket('YOUR BUCKET NAME');

app.post('/', cloudStorager({bucket}), async (req, res) => {
    res.json(req.files);
});
```

## API:

`bucket`: A Bucket (https://cloud.google.com/nodejs/docs/reference/storage/latest/Bucket)

`req.files`: Array of uploaded files

```json
[
  {
    "name": "file",
    "filename": "firebaseFunctionsUploadFile.drawio.svg",
    "encoding": "7bit",
    "mimeType": "image/svg+xml",
    "downloadUrl": "http://localhost:9199/v0/b/formzin-uploads/o/2NBb9_firebaseFunctionsUploadFile.drawio.svg?alt=media&token=token_KT0H25x3kmUEEtW76NMx"
  }
]
```
