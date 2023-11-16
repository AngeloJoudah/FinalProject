"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const dotenv = require('dotenv');
dotenv.config();
function uploadFileToAzure(files) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = files[0];
        const connectionString = process.env.STORAGE_STRING; // Replace with your Azure Storage connection string
        const containerName = process.env.PDF_STORAGE; // Replace with your container name
        const blobName = file.originalname;
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        try {
            yield blockBlobClient.uploadData(file);
            console.log('File uploaded to Azure Blob Storage.');
        }
        catch (error) {
            console.error('Error uploading file:', error);
        }
        return blockBlobClient.url;
    });
}
exports.default = uploadFileToAzure;
