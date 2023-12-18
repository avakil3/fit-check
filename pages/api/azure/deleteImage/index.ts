import type { NextApiRequest, NextApiResponse } from "next";
import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING || ""
    );

    // Get a reference to a container
    const containerName = "fitcheck";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create blob client from container client
    const fileName = req.body.fileName;
    const blockBlobClient = await containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.deleteIfExists();

    console.log(`Successfully deleted blob ${fileName}`);
    res.status(200).send(`Successfully deleted ${fileName}`);
  } catch (error) {
    res.status(500).send(`Failed to delete image: ${error}`);
  }
}
