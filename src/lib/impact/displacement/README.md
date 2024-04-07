# Displacement

This plugin calculates the number of people that have to leave their home after emitting this amount of carbon

## Parameters

### Global Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Node Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Input

`carbon`: either the total carbon or the carbon per functional unit, in gCO2eq

## Returns

`displaced-by-climate-crisis`: The number of people that have to leave their home from emitting the amount of carbon

## Calculation

```
displaced-people = ((carbon * units) / 1000000) * 0.0004 
```

More details about the calculation can be found in the [wiki](https://github.com/hoernschen/grasp/wiki)

## Example manifest

```
name: displacement-demo
description: example invoking displacement plugin
tags:
initialize:
  plugins:
    displacement:
      method: Displacement
      path: 'grasp'
      global-config:
        units: 1000
tree:
  children:
    child:
      pipeline:
        - displacement
      inputs:
        - timestamp: 2023-07-06T00:00
          carbon: 5
          duration: 1
```
