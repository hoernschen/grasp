import { PluginFactory } from '@grnsft/if-core/interfaces';
import { PluginParams, ConfigParams } from '@grnsft/if-core/types';
import { validateConfig, validateInput } from '../../validation';

/*
 * Calculate bananas
 */
const bananas = (carbon: number) => {
  const gPerBanana = 150;
  return {
    bananas: carbon / (1.28 * gPerBanana),
  };
};

export const Bananas = PluginFactory({
  configValidation: (config: ConfigParams) => {
    return validateConfig(config);
  },

  inputValidation: (input: PluginParams) => {
    return validateInput(input);
  },

  implementation: async (inputs: PluginParams[], config: ConfigParams) => {
    const inputAndConfig = Object.assign({}, inputs, config);
    const units: number = inputAndConfig.units ?? 1;
    const carbon = inputAndConfig.carbon * units;
    return inputs.map(input => {
      // logic
      bananas(carbon);
      return input;
    });
  },
});
