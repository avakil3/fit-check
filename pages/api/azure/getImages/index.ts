import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING || ""
    );

    // Get a reference to a container
    const containerName = "fitcheck";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const imageUrls = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      const url = `https://fitcheck.blob.core.windows.net/${containerName}/${blob.name}`;
      imageUrls.push({ url, name: blob.name });
    }

    const sortedImgUrls = imageUrls.sort((a, b) => {
      const aName = a.name.split("_").pop()?.toString().split(".").shift();
      const bName = b.name.split("_").pop()?.toString().split(".").shift();
      return bName - aName;
    });

    res.statusCode = 201;
    res.end(JSON.stringify(sortedImgUrls));
  } catch (error) {
    res.status(500).send(`Failed to get all images from Azure: ${error}`);
  }
}
