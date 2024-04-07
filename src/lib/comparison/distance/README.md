# Distance

This plugin calculates the distance you can travel (in different forms of transport) that emit the same amount of carbon as the input

## Parameters

### Global Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

`metrical`: the system to use for the distance output. Either miles or km. Default is km. (**Optional, Default: true**)

### Node Config

`units`: the amount of functional units you want to look at. Maybe the amount of requests your api get per month or year (**Optional, Default: 1**)

### Input

`carbon`: either the total carbon or the carbon per functional unit, in gCO2eq

## Returns

`distance/air`: The distance in km / miles that can be traveled by plane that emits the same amount of carbon

`distance/rail`: The distance in km / miles that can be traveled by train that emits the same amount of carbon

`distance/bus`: The distance in km / miles that can be traveled by bus that emits the same amount of carbon

`distance/large-car`: The distance in km / miles that can be traveled by a large car that emits the same amount of carbon

`distance/medium-car`: The distance in km / miles that can be traveled by a medium car that emits the same amount of carbon

`distance/motorcycle`: The distance in km / miles that can be traveled by motorcycle that emits the same amount of carbon

## Calculation

Travel emits different g of carbon per km depending on the type of transportation:
* Plane: 122.72 g per km 
* Train: 22.35 g per km 
* Bus: 63.37 g per km 
* Large car: 193.96 g per km
* Medium car: 144.65 g per km
* Motorcycle: 41.15 g per km

```
distance = (carbon * units) / emissions-per-km-of-transportation
```

More details about the calculation can be found in the [wiki](https://github.com/hoernschen/grasp/wiki)

## Example manifest

```
name: distance-demo
description: example invoking distance plugin
tags:
initialize:
  plugins:
    distance:
      method: Distance
      path: 'grasp'
      global-config:
        units: 1000
        metrical: true
tree:
  children:
    child:
      pipeline:
        - distance 
      inputs:
        - timestamp: 2023-07-06T00:00
          carbon: 5
          duration: 1
```
