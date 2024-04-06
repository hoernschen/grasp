import { ConfigParams } from '../../types/general';
import { PluginInterface, PluginParams } from '../../types/interface';
import { validateConfig, validateInput } from '../../validation';

export const Distance = (globalConfig: ConfigParams): PluginInterface => {
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
      const metrical: boolean = inputAndConfig.metrical ?? true;

      return {
        ...input,
        ...distancePerTransportType(carbon, metrical),
      };
    });
  };

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

  return {
    metadata,
    execute,
  };
};
