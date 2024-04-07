# Premature Deaths

This plugin calculates the number of premature deaths that can occur after emitting this amount of carbon

## Parameters

### Global Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Node Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Input

`carbon`: either the total carbon or the carbon per functional unit, in gCO2eq

## Returns

`premature-deaths`: The number of premature deaths that occur from emitting the amount of carbon

## Calculation

1000 tons of carbon causes 1 premature death

```
premature-deaths = ((carbon * units) / 1000000) / 1000 
```

More details about the calculation can be found in the [wiki](https://github.com/hoernschen/grasp/wiki)

## Example manifest

```
name: death-demo
description: example invoking death plugin
tags:
initialize:
  plugins:
    death:
      method: Death 
      path: 'grasp'
      global-config:
        units: 1000
tree:
  children:
    child:
      pipeline:
        - death
      inputs:
        - timestamp: 2023-07-06T00:00
          carbon: 5
          duration: 1
```
