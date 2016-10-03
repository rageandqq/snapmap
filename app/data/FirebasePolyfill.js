import RNFetchBlob from 'react-native-fetch-blob';

const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
