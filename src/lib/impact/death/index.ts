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
        ...deathByCarbonEmissions(carbon),
      };
    });
  };

  /*
   * Calculates the premature deaths per ton of carbon
   */
  const deathByCarbonEmissions = (carbon: number) => {
    const carbonMetricTon = carbon / 1000000;
    const tonsPerDeath = 1000;
    return {
      prematureDeaths: carbonMetricTon / tonsPerDeath,
    };
  };

  return {
    metadata,
    execute,
  };
};
