import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const imgResponse = await axios.get(req.body.imgURL, {
      responseType: "arraybuffer",
    });

    const arrayBuffer = imgResponse.data;

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING || ""
    );

    // Get a reference to a container
    const containerName = "fitcheck";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create a blob (file) name
    const timestamp = new Date().getTime();
    const file_name = `${req.body.prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    await blockBlobClient.uploadData(arrayBuffer);
    console.log("File uploaded successfully!");
    res.status(200).send(`Uploaded ${file_name} successfully`);
  } catch (error) {
    res.status(500).send(`Failed to upload to Azure: ${error}`);
  }
}
