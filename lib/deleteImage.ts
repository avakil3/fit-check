async function deleteImage(fileName: string) {
  const res = await fetch("/api/azure/deleteImage", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileName }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete image from Azure Blob Storage");
  }

  return res;
}

export default deleteImage;
