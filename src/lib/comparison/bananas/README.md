# Bananas

This plugin calculates the amount of bananas that emit the same amount of carbon as the input. It is inspired by the popular [meme](https://knowyourmeme.com/memes/banana-for-scale) *Banana for scale* we created **Banana(s) for scale**. 

## Parameters

### Global Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Node Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Input

`carbon`: either the total carbon or the carbon per functional unit, in gCO2eq

## Returns

`bananas`: The amount of bananas that emit the same amount of carbon

## Calculation

1 kg of bananas emit 1.28 kg of carbon through its life cycle. The estimate that a regular banana is approx. 150 g.

```
bananas = (carbon * units) / (1.28 * 150)
```

More details about the calculation can be found in the [wiki](https://github.com/hoernschen/grasp/wiki)

## Example manifest

```
name: bananas-demo
description: example invoking bananas plugin
tags:
initialize:
  plugins:
    bananas:
      method: Bananas
      path: 'grasp'
      global-config:
        units: 1000
tree:
  children:
    child:
      pipeline:
        - bananas
      inputs:
        - timestamp: 2023-07-06T00:00
          carbon: 5
          duration: 1
```
