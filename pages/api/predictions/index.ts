import { fineTunePrompt, negative_prompt, lora_scale } from "@/model_inputs";

export default async function handler(req, res) {
  const fine_tuned_prompt = fineTunePrompt(req.body.prompt);
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/sdxl
      version:
        "bdec9eb8a2c53892e0b2476e7c2a29f0977f7aa823c58b6bc2148c2fc4adde67",

      input: { prompt: fine_tuned_prompt, negative_prompt, lora_scale },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
