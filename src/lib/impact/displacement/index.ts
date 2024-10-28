import { PluginFactory } from '@grnsft/if-core/interfaces';
import { PluginParams, ConfigParams } from '@grnsft/if-core/types';
import { validateConfig, validateInput } from '../../validation';

/*
 * Calculate the amount of displaced humans by climate change per ton of Co2e.
 */
const displacedPeople = (carbon: number) => {
  // Check documentation of the plugin to understand where this number comes from
  const displacedByTonOfCarbon = 0.0004;
  const carbonInMetricTon = carbon / 1000000;
  return {
    'displaced-people': carbonInMetricTon * displacedByTonOfCarbon,
  };
};

export const Displacement = PluginFactory({
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
      displacedPeople(carbon);
      return input;
    });
  },
});
