# Social Cost of Carbon

This plugin calculates the amount of damages (in $) that can occur after emitting this amount of carbon (with different years)

## Parameters

### Global Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Node Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Input

`carbon`: either the total carbon or the carbon per functional unit, in gCO2eq

## Returns

`social-cost-of-carbon/2020`: The social cost that occur from emitting the amount of carbon by 2020

`social-cost-of-carbon/2025`: The social cost that occur from emitting the amount of carbon by 2025

`social-cost-of-carbon/2050`: The social cost that occur from emitting the amount of carbon by 2050

## Calculation

1 ton of carbon causes different costs depending on the considered year:
* 2020: $ 3557
* 2025: $ 4185
* 2050: $ 16552

```
social-cost-of-carbon = ((carbon * units) / 1000000) / cost-per-ton
```

More details about the calculation can be found in the [wiki](https://github.com/hoernschen/grasp/wiki)

## Example manifest

```
name: scc-demo
description: example invoking scc plugin
tags:
initialize:
  plugins:
    scc:
      method: SCC 
      path: 'grasp'
      global-config:
        units: 1000
tree:
  children:
    child:
      pipeline:
        - scc
      inputs:
        - timestamp: 2023-07-06T00:00
          carbon: 5
          duration: 1
```
