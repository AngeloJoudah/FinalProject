
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const dotenv = require('dotenv')
dotenv.config()
async function uploadFileToAzure(files) {
  const file = files[0]
  const connectionString = process.env.STORAGE_STRING; // Replace with your Azure Storage connection string
  const containerName = process.env.PDF_STORAGE; // Replace with your container name
  const blobName = file.originalname;
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadData(file);
    console.log('File uploaded to Azure Blob Storage.');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
  return blockBlobClient.url
}

export default uploadFileToAzure 