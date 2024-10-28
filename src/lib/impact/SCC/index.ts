import { PluginFactory } from '@grnsft/if-core/interfaces';
import { PluginParams, ConfigParams } from '@grnsft/if-core/types';
import { validateConfig, validateInput } from '../../validation';

/**
 * Calculate the Social Cost of Carbon based on the previously delivered carbon metrics.
 * The social cost of carbon (SCC) is a metric used to quantify the economic damages associated with emitting one additional ton of carbon dioxide into the atmosphere, accounting for its impact on agriculture, human health, property damages from increased flood risk, and changes in energy system costs, among others. It reflects the monetary value of the long-term damage done by a ton of carbon dioxide emissions in a given year, thus providing a way for policymakers to weigh the benefits of reducing greenhouse gas emissions against their economic costs.
 */
const socialCostOfCarbon = (carbon: number) => {
  // carbon is currently in gram, SCC is refering to tons, therefore grams are converted to ton
  const carbonMetricTon = carbon / 1000000;

  // each year has an individual cost per ton in USD
  const cost2020 = 3557;
  const cost2025 = 4185;
  const cost2050 = 16552;

  return {
    'social-cost-of-carbon/2020': carbonMetricTon * cost2020,
    'social-cost-of-carbon/2025': carbonMetricTon * cost2025,
    'social-cost-of-carbon/2050': carbonMetricTon * cost2050,
  };
};

export const SCC = PluginFactory({
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
      socialCostOfCarbon(carbon);
      return input;
    });
  },
});
