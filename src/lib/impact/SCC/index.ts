import { ConfigParams } from '../../types/general';
import { PluginInterface, PluginParams } from '../../types/interface';
import { validateConfig, validateInput } from '../../validation';

export const Bananas = (globalConfig: ConfigParams): PluginInterface => {
  const metadata = {
    kind: 'execute',
  };

  /**
   * Execute's strategy description here.
   */
  const execute = async (
    inputs: PluginParams[],
    config?: ConfigParams
  ): Promise<PluginParams[]> => {
    const mergedConfig = Object.assign({}, globalConfig, config);
    const validatedConfig = validateConfig(mergedConfig);

    return inputs.map(input => {
      const validatedInput = validateInput(input);
      const inputAndConfig = Object.assign({}, validatedInput, validatedConfig);

      const units: number = inputAndConfig.units ?? 1;
      const carbon = inputAndConfig.carbon * units;

      return {
        ...input,
        ...socialCostOfCarbon(carbon),
      };
    });
  };


    /*
   * Calculate the Social Cost of Carbon based on the previously delivered carbon metrics.
   * The social cost of carbon (SCC) is a metric used to quantify the economic damages associated with emitting one additional ton of carbon dioxide into the atmosphere, accounting for its impact on agriculture, human health, property damages from increased flood risk, and changes in energy system costs, among others. It reflects the monetary value of the long-term damage done by a ton of carbon dioxide emissions in a given year, thus providing a way for policymakers to weigh the benefits of reducing greenhouse gas emissions against their economic costs.
   */
    const socialCostOfCarbon = (carbon: number) => {
      //carbon is currently in gram, SCC is refering to tons, therefore grams are converted to ton
      const carbonMetricTon = carbon / 1000000;
      //each year has an individual cost per ton in USD, 
      const cost2020 = 3557;
      const cost2025 = 4185;
      const cost2050 = 16552;
      return {
        'social-cost-of-carbon/2020': carbonMetricTon * cost2020,
        'social-cost-of-carbon/2025': carbonMetricTon * cost2025,
        'social-cost-of-carbon/2050': carbonMetricTon * cost2050,
      };
    };

  return {
    metadata,
    execute,
  };
};

