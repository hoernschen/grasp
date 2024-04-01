import {ConfigParams} from '../types/general';
import {PluginInterface, PluginParams} from '../types/interface';
import {validateConfig, validateInput} from './validation';

export const Grasp = (globalConfig: ConfigParams): PluginInterface => {
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

      const units = inputAndConfig.units ? inputAndConfig.units : 1;
      const carbon = inputAndConfig.carbon * units;

      return {
        ...input,
        ...cupsOfCoffee(carbon),
      };
    });
  };

  /*
   * Calculate cups of coffee
   */
  const cupsOfCoffee = (carbon: number) => {
    return {
      'cups-of-coffee': {
        value: carbon / 60,
        source: 'https://www.gcrmag.com/coffees-carbon-footprint/',
      },
    };
  };

  return {
    metadata,
    execute,
  };
};
