async function getImages() {
  const res = await fetch("/api/azure/getImages", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get all images from Azure Blob Storage");
  }

  return res.json();
}

export default getImages;
