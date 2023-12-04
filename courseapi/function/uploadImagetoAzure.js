const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const dotenv = require('dotenv')
dotenv.config()
async function uploadImageToAzure(base64,fileName) {
  const connectionString = process.env.STORAGE_STRING; // Replace with your Azure Storage connection string
  const containerName = process.env.PDF_STORAGE; // Replace with your container name
  const blobName = fileName
  const imageBuffer = Buffer.from(base64, 'base64');
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadData(imageBuffer);
    console.log('File uploaded to Azure Blob Storage.');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
  return blockBlobClient.url
}

export default uploadImageToAzure