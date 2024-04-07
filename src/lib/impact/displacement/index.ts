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
        ...displacedByClimateCrisis(carbon),
      };
    });
  };

  /*
   * Calculate the amount of displaced humans by climate change per ton of Co2e.
   */
  const displacedByClimateCrisis = (carbon: number) => {
    //Check documentation of the plugin to understand where this number comes from
    const displacedByTonofCarbon = 0.0004;
    const carbonInMetricTon = carbon / 1000000;
    return {
      'displaced-by-climate-crisis': displacedByTonofCarbon / carbonInMetricTon,
    };
  };

  return {
    metadata,
    execute,
  };
};
