import {YourGlobalConfig} from './types';
import {PluginInterface, PluginParams} from '../types/interface';

export const Grasp = (globalConfig: YourGlobalConfig): PluginInterface => {
  const metadata = {
    kind: 'execute',
  };

  /**
   * Execute's strategy description here.
   */
  const execute = async (inputs: PluginParams[]): Promise<PluginParams[]> => {
    return inputs.map(input => {
      // your logic here
      globalConfig;

      // TODO: Check the provided input -> Is everything provided to run the plugin?
      if (!('carbon' in input)) {
        return input;
      }
      // TODO: handle all conversions. add an option to turn them off

      // TODO: Output
      return {
        ...input,
        ...cupsOfCoffee(input),
      };
    });
  };

  const cupsOfCoffee = (input: PluginParams) => {
    return {
      'cups-of-coffee': {
        value: input['carbon'] / 60,
        source: 'https://www.gcrmag.com/coffees-carbon-footprint/',
      },
    };
  };

  return {
    metadata,
    execute,
  };
};
