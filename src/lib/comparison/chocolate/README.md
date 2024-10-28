# Chocolate

This plugin calculates the amount of chocolate bars (in different types) that emit the same amount of carbon as the input

## Parameters

### Global Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Node Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Input

`carbon`: either the total carbon or the carbon per functional unit, in gCO2eq

## Returns

`bars-of-chocolate/dark`: The amount of dark chocolate that emits the same amount of carbon

`bars-of-chocolate/milk`: The amount of milk chocolate that emits the same amount of carbon

`bars-of-chocolate/white`: The amount of white chocolate that emits the same amount of carbon

## Calculation

1 kg of chocolate emits different kg of carbon depending on its type through its life cycle:
* dark: 1.67 kg
* milk: 4.19 kg
* white: 4.1 kg

We define one bar of chocolate to have 100 g.

```
bars-of-chocolate = (carbon * units) / (emissions-of-chocolate-type * 150)
```

More details about the calculation can be found in the [wiki](https://github.com/hoernschen/grasp/wiki)

## Example manifest

```
name: chocolate-demo
description: example invoking chocolate plugin
tags:
initialize:
  plugins:
    chocolate:
      path: 'https://github.com/hoernschen/grasp'
      method: Chocolate
      config:
        units: 1000
tree:
  children:
    child:
      pipeline:
        - chocolate 
      inputs:
        - timestamp: 2023-07-06T00:00
          carbon: 5
          duration: 1
```
