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

      const units = inputAndConfig.units ? inputAndConfig.units : 1;
      const carbon = inputAndConfig.carbon * units;

      return {
        ...input,
        ...bananas(carbon),
      };
    });
  };

  /*
   * Calculate bananas
   */
  const bananas = (carbon: number) => {
    const gPerBanana = 150;
    return {
      bananas: carbon / (1.28 * gPerBanana),
    };
  };

  return {
    metadata,
    execute,
  };
};
