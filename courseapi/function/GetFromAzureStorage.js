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

const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const dotenv = require('dotenv')
dotenv.config()
async function retrieveBlobFromUrl(blobUrl) {
    const url = blobUrl.slice(blobUrl.lastIndexOf('/')+1).replace(' ','%20')
    console.log(url)
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_STRING)
    const blobContainerClient = blobServiceClient.getContainerClient(process.env.PDF_STORAGE)
    const blockBlobClient = blobContainerClient.getBlockBlobClient(url)
    try {
      const response = await blockBlobClient.download();
  
      if (!response.readableStreamBody) {
        throw new Error('Failed to retrieve blob');
      }
  
      const blobData = await streamToBuffer(response.readableStreamBody);
      return blobData;
      // Use blobData as needed
    } catch (error) {
      console.error('Error retrieving blob:',error);
    }
  }
  
  // Helper function to convert a stream to a buffer
  async function streamToBuffer(readableStream) {
    const chunks = [];
    for await (const chunk of readableStream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

export default retrieveBlobFromUrl