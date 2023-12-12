import React from "react";

function PromptInput() {
  return (
    <div className="m-10">
      <form className="flex flex-col md:flex-row shadow-lg shadow-slate-800/10 border rounded-lg md:h-12">
        <div className="font-semibold pt-4 pl-4 pr-0 md:pt-2 italic text-gray-500">
          Generate a photo of a man...
        </div>
        <textarea
          className="flex-1 p-4 md:p-2 outline-none rounded-md italic"
          placeholder="wearing a smart-casual outfit for date night"
        />
        <button
          type="submit"
          className="p-4 md:p-2 bg-sky-800 text-white transition-colors duration-200 font-bold
         disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400 rounded-md
          "
        >
          Generate
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
