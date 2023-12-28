import {
  fineTunePrompt,
  negative_prompt,
  lora_scale,
  refine,
  high_noise_frac,
} from "@/model_inputs";

import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // fine tune the user's given prompt with additional text for better AI image generation
  const fine_tuned_prompt = fineTunePrompt(req.body.prompt);

  let prediction = await replicate.deployments.predictions.create(
    "avakil3",
    "fit-check",
    {
      input: {
        prompt: fine_tuned_prompt,
        negative_prompt,
        lora_scale,
        refine,
        high_noise_frac,
      },
    }
  );

  if (prediction.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  prediction = await replicate.wait(prediction);

  if (prediction.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }
  // success
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
