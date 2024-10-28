import { PluginFactory } from '@grnsft/if-core/interfaces';
import { PluginParams, ConfigParams } from '@grnsft/if-core/types';
import { validateConfig, validateInput } from '../../validation';

/*
 * Distance per transport type
 */
const distancePerTransportType = (carbon: number, metrical: boolean) => {
  const conversionFactor = metrical ? 1 : 0.6213711922;
  return {
    'distance/air': (carbon / 122.72) * conversionFactor,
    'distance/rail': (carbon / 22.35) * conversionFactor,
    'distance/bus': (carbon / 63.37) * conversionFactor,
    'distance/large-car': (carbon / 193.96) * conversionFactor,
    'distance/medium-car': (carbon / 144.65) * conversionFactor,
    'distance/motorcycle': (carbon / 41.15) * conversionFactor,
  };
};

export const Distance = PluginFactory({
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
    const metrical: boolean = inputAndConfig.metrical ?? true;
    return inputs.map(input => {
      // logic
      distancePerTransportType(carbon, metrical);
      return input;
    });
  },
});
