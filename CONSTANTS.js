const IS_CLI = process.env.IS_FIREBASE_CLI === 'true';
const STORAGE_EMULATOR_HOST = process.env.STORAGE_EMULATOR_HOST;
const BUCKET_NAME = 'formzin-uploads';
const FUNCTIONS_REGION = 'asia-southeast1';

module.exports = {
    IS_CLI,
    STORAGE_EMULATOR_HOST,
    BUCKET_NAME,
    FUNCTIONS_REGION,
};
