import { PluginFactory } from '@grnsft/if-core/interfaces';
import { PluginParams, ConfigParams } from '@grnsft/if-core/types';
import { validateConfig, validateInput } from '../../validation';

/*
 * Calculates the premature deaths per ton of carbon
 */
const deathByCarbonEmissions = (carbon: number) => {
  const carbonMetricTon = carbon / 1000000;
  const tonsPerDeath = 1000;
  return {
    'premature-deaths': carbonMetricTon / tonsPerDeath,
  };
};

export const Death = PluginFactory({
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
      deathByCarbonEmissions(carbon);
      return input;
    });
  },
});
