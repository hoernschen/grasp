# Chocolate

This plugin calculates the amount of cups of coffee (in different variations) that emit the same amount of carbon as the input

## Parameters

### Global Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Node Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Input

`carbon`: either the total carbon or the carbon per functional unit, in gCO2eq

## Returns

`cups-of-coffee/espresso`: The amount of Espresso that emits the same amount of carbon

`cups-of-coffee/flat-white`: The amount of Flat White that emits the same amount of carbon

`cups-of-coffee/cappuccino`: The amount of Cappuccino that emits the same amount of carbon

`cups-of-coffee/latte`: The amount of Caffee Latte that emits the same amount of carbon

## Calculation

Coffee emits different g of carbon depending on its preparation through its life cycle:
* Espresso: 280 g 
* Flat White: 340 g 
* Cappuccino: 410 g 
* Caffee Latte: 550 g 

```
bars-of-chocolate = (carbon * units) / emissions-of-cup-of-coffee-preparation
```

More details about the calculation can be found in the [wiki](https://github.com/hoernschen/grasp/wiki)

## Example manifest

```
name: coffee-demo
description: example invoking chocolate plugin
tags:
initialize:
  plugins:
    coffee:
      method: Coffee 
      path: 'grasp'
      global-config:
        units: 1000
tree:
  children:
    child:
      pipeline:
        - coffee
      inputs:
        - timestamp: 2023-07-06T00:00
          carbon: 5
          duration: 1
```
