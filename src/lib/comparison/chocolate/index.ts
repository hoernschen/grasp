import { PluginFactory } from '@grnsft/if-core/interfaces';
import { PluginParams, ConfigParams } from '@grnsft/if-core/types';
import { validateConfig, validateInput } from '../../validation';

/*
 * Calculate bars of chocolate
 */
const barsOfChocolate = (carbon: number) => {
  const gPerBar = 100;
  return {
    'bars-of-chocolate/dark': carbon / (1.67 * gPerBar),
    'bars-of-chocolate/milk': carbon / (4.19 * gPerBar),
    'bars-of-chocolate/white': carbon / (4.1 * gPerBar),
  };
};

export const Chocolate = PluginFactory({
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
      barsOfChocolate(carbon);
      return input;
    });
  },
});
