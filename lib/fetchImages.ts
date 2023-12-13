const fetchImages = () =>
  fetch("", {
    cache: "no-store",
  }).then((res) => res.json());

export default fetchImages;
