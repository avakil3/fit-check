type Props = {
  imgURL: String;
  prompt: String;
};

async function uploadToAzure(data: Props) {
  const res = await fetch("/api/azure/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to upload to Azure Blob Storage");
  }

  return res;
}

export default uploadToAzure;
