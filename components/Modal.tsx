import React from "react";
import Image from "next/image";
import deleteImage from "@/lib/deleteImage";
import { ImageType } from "./Images";

type Props = {
  imgUrl: string;
  setClickedImg: React.Dispatch<React.SetStateAction<ImageType | null>>;
  refreshImages: () => {};
  prompt: string | undefined;
};

function Modal({ imgUrl, setClickedImg, refreshImages, prompt }: Props) {
  const closeModal = () => {
    setClickedImg(null);
  };

  const handleDelete = async (imgUrl: string) => {
    const fileName = imgUrl.split("/").slice(-1)[0];
    await deleteImage(fileName);
    closeModal();
    refreshImages();
  };

  return (
    <>
      <div className="overlay" onClick={closeModal}>
        <div className="image_container border-solid border-red-200">
          <img
            src={imgUrl}
            alt="enlarged image"
            className="w-full rounded-sm shadow-2xl drop-shadow-lg"
          />
          <div className="flex justify-between pt-3 bg-white/50 rounded-sm p-2">
            <p className="italic">{prompt}</p>
            <button
              className="bg-black/40 hover:bg-gray-100/10 text-red-600 font-semibold py-2 px-4 border border-red-600 rounded shadow"
              onClick={() => handleDelete(imgUrl)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
