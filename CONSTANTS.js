const IS_CLI = process.env.IS_FIREBASE_CLI === 'true';
const STORAGE_EMULATOR_HOST = process.env.STORAGE_EMULATOR_HOST;

module.exports = {
    IS_CLI,
    STORAGE_EMULATOR_HOST,
};
