"use client";
import React, { useState } from "react";
import useSWR from "swr";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function PromptInput() {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitBtnDisabled, setSubmitBtnDisabled] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitBtnDisabled(true);
    setError(null);

    // const response = await fetch("/api/predictions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt: input,
    //   }),
    // });
    // let prediction = await response.json();
    // if (response.status !== 201) {
    //   setError(prediction.detail);
    //   return;
    // }
    // setPrediction(prediction);

    // while (
    //   prediction.status !== "succeeded" &&
    //   prediction.status !== "failed"
    // ) {
    //   await sleep(1000);
    //   const response = await fetch("/api/predictions/" + prediction.id);
    //   prediction = await response.json();
    //   if (response.status !== 200) {
    //     setError(prediction.detail);
    //     return;
    //   }
    //   console.log({ prediction });
    //   setPrediction(prediction);
    // }

    setSubmitBtnDisabled(false);
  };

  return (
    <div className="m-10">
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row shadow-lg shadow-slate-800/10 border rounded-lg md:h-12"
      >
        <div className="font-semibold pt-4 pl-4 pr-0 md:pt-2 italic text-gray-500">
          Generate a photo of a man...
        </div>
        <textarea
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
              ? "text-gray-300 cursor-not-allowed "
              : "bg-sky-800 text-white transition-colors duration-200"
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
