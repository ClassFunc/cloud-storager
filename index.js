const Busboy = require('busboy');
const {genId} = require('cf-gen-id');
const {IS_CLI, STORAGE_EMULATOR_HOST} = require('./CONSTANTS');

/**
 *
 * @param bucket - A {@link https://cloud.google.com/nodejs/docs/reference/storage/latest/Bucket | Bucket}
 * @returns {(function(*, *, *): (*|undefined))|*}
 */
const cloudStorager = ({bucket}) => (req, res, next) => {
    if (req.method !== 'POST') {
        // Return a "method not allowed" error
        return res.status(405).end();
    }
    const busboy = Busboy({
        headers: req.headers,
    });
    const writeProcesses = [];
    busboy.on('file', (name, file, {filename, encoding, mimeType}) => {
        const savedFileName = genId() + '_' + filename;
        const writeStream = bucket.file(savedFileName).createWriteStream();
        file.pipe(writeStream);
        file.on('end', () => writeStream.end());
        writeProcesses.push(new Promise((resolve, reject) => {
            writeStream.on('finish', async () => {
                const meta = await setFirebaseDownloadTokenAsync(
                    bucket.file(savedFileName));
                const downloadUrl =
                    genDownloadUrl(meta, savedFileName, bucket.name);
                resolve({
                    name,
                    filename,
                    encoding,
                    mimeType,
                    downloadUrl,
                });
            });
            writeStream.on('error', reject);
        }));

    });
    busboy.on('close', async () => {
        req.files = await Promise.all(writeProcesses);
        next();
    });
    busboy.end(req.rawBody);
};

const setFirebaseDownloadTokenAsync = async file => {
    const [meta] = await file.setMetadata({
        metadata: {
            firebaseStorageDownloadTokens: genId({prefix: 'token_', size: 20}),
        },
    });
    return meta;
};

const genDownloadUrl = (meta, fileName, bucketName) => {
    const firebaseStorageDownloadTokens = meta?.metadata?.firebaseStorageDownloadTokens;
    let url;
    if (firebaseStorageDownloadTokens) {
        const domain = IS_CLI
            ? STORAGE_EMULATOR_HOST
            : 'https://firebasestorage.googleapis.com';

        url = `${domain}/v0/b/${bucketName}/o/${encodeURIComponent(
            fileName)}?alt=media&token=${firebaseStorageDownloadTokens}`;
    } else {
        url = meta?.mediaLink;
    }
    return url;
};

module.exports = cloudStorager;
