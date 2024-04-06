import { ConfigParams } from '../../types/general';
import { PluginInterface, PluginParams } from '../../types/interface';
import { validateConfig, validateInput } from '../../validation';

export const Coffee = (globalConfig: ConfigParams): PluginInterface => {
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
        ...cupsOfCoffee(carbon),
      };
    });
  };

  /*
   * Calculate cups of coffee
   */
  const cupsOfCoffee = (carbon: number) => {
    return {
      'cups-of-coffee/espresso': carbon / 280,
      'cups-of-coffee/flat-white': carbon / 340,
      'cups-of-coffee/cappuccino': carbon / 410,
      'cups-of-coffee/caffee-latte': carbon / 550,
    };
  };

  return {
    metadata,
    execute,
  };
};
