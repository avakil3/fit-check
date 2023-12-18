"use client";
import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import getImages from "@/lib/getImages";
import Modal from "./Modal";

type ImageType = {
  name: string;
  url: string;
};

function Images() {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/azure/getImages", getImages, {
    revalidateOnFocus: false,
  });

  const [clickedImg, setClickedImg] = useState<string | null>(null);

  const handleClick = (imgUrl: string) => {
    setClickedImg(imgUrl);
  };

  return (
    <div>
      <button
        onClick={() => refreshImages(images)}
        className="fixed bottom-10 right-10 bg-black/90 text-white px-5 py-3 rounded-md
      hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black font-bold z-20"
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>

      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading AI Generated Images...
        </p>
      )}
      <div
        className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10"
      >
        {images?.map((image: ImageType, idx: number) => (
          <div
            key={image.name}
            className={`relative cursor-help 
                ${idx === 0 && "md:col-span-2 md:row-span-2"}
                hover:scale-[103%] transition-transform duration-200
                ease-in-out
                `}
            onClick={() => handleClick(image.url)}
          >
            {/* creates a white div that displays prompt text when use hovers over image */}
            <div
              className="absolute flex justify-center items-center 
            w-full h-full bg-white opacity-0 hover:opacity-80 
            transition-opacity duration-200 z-10"
            >
              <p className="text-center font-light text-lg p-5">
                {/* This removes the Timestamp and .png file extension  */}
                {image.name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </div>
            <Image
              src={image.url}
              alt={image.name}
              height={1024}
              width={1024}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
      {clickedImg && (
        <Modal
          imgUrl={clickedImg}
          setClickedImg={setClickedImg}
          refreshImages={refreshImages}
        />
      )}
    </div>
  );
}

export default Images;
