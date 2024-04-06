import { z } from 'zod';
import { ConfigParams } from './types/general';
import { PluginParams } from './types/interface';

import { allDefined, validate } from './util/validations';

export const validateConfig = (config: ConfigParams) => {
  const schema = z.object({
    units: z.number().gte(0).optional(),
    metrical: z.boolean().optional(),
  });

  return validate<z.infer<typeof schema>>(schema, config);
};

export const validateInput = (input: PluginParams) => {
  const message = 'Carbon should be present as an input';

  const schema = z
    .object({
      carbon: z.number().gte(0),
    })
    .refine(allDefined, { message });

  return validate<z.infer<typeof schema>>(schema, input);
};
