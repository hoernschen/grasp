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
        ...bananas(carbon),
        ...cupsOfCoffee(carbon),
        ...barsOfChocolate(carbon),
        ...socialCostOfCarbon(carbon),        
        ...deathPerTon(carbon),
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

  /*
   * Calculate cups of coffee
   */
  const cupsOfCoffee = (carbon: number) => {
    return {
      'cups-of-coffee': {
        espresso: carbon / 280,
        'flat-white': carbon / 340,
        cappuccino: carbon / 410,
        'caffee-latte': carbon / 550,
      },
    };
  };

  /*
   * Calculate bars of chocolate
   */
  const barsOfChocolate = (carbon: number) => {
    const gPerBar = 100;
    return {
      'bars-of-chocolate': {
        dark: carbon / (1.67 * gPerBar),
        milk: carbon / (4.19 * gPerBar),
        white: carbon / (4.1 * gPerBar),
      },
    };
  };

  /*
   * Calculate the Social Cost of Carbon based on the previously delivered carbon metrics.
   * The social cost of carbon (SCC) is a metric used to quantify the economic damages associated with emitting one additional ton of carbon dioxide into the atmosphere, accounting for its impact on agriculture, human health, property damages from increased flood risk, and changes in energy system costs, among others. It reflects the monetary value of the long-term damage done by a ton of carbon dioxide emissions in a given year, thus providing a way for policymakers to weigh the benefits of reducing greenhouse gas emissions against their economic costs.
   */
  const socialCostOfCarbon = (carbon: number) => {
    //carbon is currently in gram, SCC is refering to tons, therefore grams are converted to ton
    const carbonMetricTon = carbon / 1000000;
    //each year has an individual cost per ton in USD, e
    const cost2020 = 3557;
    const cost2025 = 4185;
    const cost2050 = 16552;
    return {
      'Social-Cost-of-Carbon per year': {
        2020: carbonMetricTon * cost2020,
        2025: carbonMetricTon * cost2025,
        2050: carbonMetricTon * cost2050,
      },
    };
  };

  /*
   * Calculates the premature deaths per ton of carbon
   */
    const deathPerTon = (carbon: number) => {
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
