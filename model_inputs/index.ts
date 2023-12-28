export const fineTunePrompt = (user_input: string) =>
  "A full body photo of TOK, " +
  user_input +
  ", fashion photography, oversized fit";

export const negative_prompt: string =
  "((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, \
  mutated hands, malformed hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), \
   (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, \
   (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), \
   ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), (missing legs) mutated hands, \
   (fused fingers), ((too many fingers)), (((long neck))), (bad eyes), malformed eyes, crossed eyes, ugly eyes,\
    dead eyes, poorly rendered hands, deformed hands, deformed fingers, too long fingers";

export const lora_scale: number = 0.7;

export const refine: string = "expert_ensemble_refiner";

export const high_noise_frac: number = 0.9;
