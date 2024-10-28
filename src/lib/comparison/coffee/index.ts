import { PluginFactory } from '@grnsft/if-core/interfaces';
import { PluginParams, ConfigParams } from '@grnsft/if-core/types';
import { validateConfig, validateInput } from '../../validation';

/*
 * Calculate cups of coffee
 */
const cupsOfCoffee = (carbon: number) => {
  return {
    'cups-of-coffee/espresso': carbon / 280,
    'cups-of-coffee/flat-white': carbon / 340,
    'cups-of-coffee/cappuccino': carbon / 410,
    'cups-of-coffee/latte': carbon / 550,
  };
};

export const Coffee = PluginFactory({
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
      cupsOfCoffee(carbon);
      return input;
    });
  },
});
