# Cloud Storager

### [ExpressJS Middleware] Save uploaded files to bucket for Firebase & Google Cloud Storage

## Install:

```shell
npm i -S cloud-storager
or
yarn add cloud-storager
```

## Usage:

```js
const app = require('express')()
app.post('/', cloudStorager({bucket}), async (req, res) => {
    res.json(req.files);
});
```

## API:

`bucket`: A Bucket (https://cloud.google.com/nodejs/docs/reference/storage/latest/Bucket)

`req.files`: Array of saved files, contains downloadUrl.

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

## Author:
ClassFunc Softwares.,JSC

## License:
MIT

