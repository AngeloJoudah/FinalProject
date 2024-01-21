"use strict";
/*import axios from "axios";
export default getBlobFromURL = async(url)=>{
  try{
    await axios.get(url,
      {headers:{
        Authorization:`SharedKey akspersistence:${process.env.KEY}` ,
        'x-ms-date':new Date()
      }})
  }
}
async function streamToBuffer(readableStream) {
  const chunks = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const dotenv = require('dotenv');
dotenv.config();
function retrieveBlobFromUrl(blobUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = blobUrl.slice(blobUrl.lastIndexOf('/') + 1).replace(' ', '%20');
        console.log(url);
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_STRING);
        const blobContainerClient = blobServiceClient.getContainerClient(process.env.PDF_STORAGE);
        const blockBlobClient = blobContainerClient.getBlockBlobClient(url);
        try {
            const response = yield blockBlobClient.download();
            if (!response.readableStreamBody) {
                throw new Error('Failed to retrieve blob');
            }
            const blobData = yield streamToBuffer(response.readableStreamBody);
            return blobData;
            // Use blobData as needed
        }
        catch (error) {
            console.error('Error retrieving blob:', error);
        }
    });
}
// Helper function to convert a stream to a buffer
function streamToBuffer(readableStream) {
    var _a, readableStream_1, readableStream_1_1;
    var _b, e_1, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const chunks = [];
        try {
            for (_a = true, readableStream_1 = __asyncValues(readableStream); readableStream_1_1 = yield readableStream_1.next(), _b = readableStream_1_1.done, !_b; _a = true) {
                _d = readableStream_1_1.value;
                _a = false;
                const chunk = _d;
                chunks.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = readableStream_1.return)) yield _c.call(readableStream_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Buffer.concat(chunks);
    });
}
exports.default = retrieveBlobFromUrl;
