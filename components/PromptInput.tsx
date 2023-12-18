"use client";
import React, { useState } from "react";
import useSWR from "swr";
import uploadToAzure from "@/lib/uploadToAzure";
import getImages from "@/lib/getImages";
import toast from "react-hot-toast";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function PromptInput() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  // refreshImages() is used to pull in the newly generated image from Azure
  const { mutate: refreshImages } = useSWR("/api/azure/getImages", getImages, {
    revalidateOnFocus: false,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitBtnDisabled(true);
    setError(null);

    // Show loading notification / toast message
    const notificationText = input.slice(0, 50);
    const notification = toast.loading(
      `Fit Check AI is creating: ${notificationText}...`
    );

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      toast.error(prediction.detail, {
        id: notification,
      });
      return;
    }

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      // console.log({ prediction });
    }

    const uploadToAzureResponse = await uploadToAzure({
      imgURL: prediction.output[0],
      prompt: input,
    });

    // TODO: FIX error message coming back from res
    if (uploadToAzureResponse.status != 200) {
      toast.error("Failed to upload image to Azure Storage", {
        id: notification,
      });
      return;
    }

    toast.success("Your AI outfit has been generated!", { id: notification });
    setSubmitBtnDisabled(false);
    refreshImages();
  };

  return (
    <div className="m-10">
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row shadow-lg shadow-slate-800/10 border rounded-lg md:h-12"
      >
        <div className="font-semibold pt-4 pl-4 pb-4 pr-0 md:pt-2.5 italic text-gray-500">
          Generate a photo of a man...
        </div>
        <input
          type="text"
          value={input}
          className="flex-1 p-4 md:p-2 outline-none rounded-md italic"
          placeholder="wearing a smart-casual outfit for date night"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={!input || isSubmitBtnDisabled}
          className={`p-4 md:p-2 font-bold rounded-md ${
            !input || isSubmitBtnDisabled
              ? "text-gray-300 cursor-not-allowed"
              : "bg-black text-white transition-colors duration-200"
          }`}
        >
          {isSubmitBtnDisabled ? "Loading..." : "Generate"}
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default PromptInput;
