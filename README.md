# Grasp - A collection of calculations to convert software's carbon emission into something easier to "grasp"

This is a collection of [Impact Framework](https://github.com/Green-Software-Foundation/if) Plugins with the goal to make the carbon metric, calculated before in the pipeline, easier to understand. It is split into two types of metrics: `impact` metrics and `comparison` metrics

Every calculation in this repo is carefully researched and validated. You can find more detailed information about the background of each metric with sources in the [wiki](https://github.com/hoernschen/grasp/wiki).

You found a more current calculation to one of our metrics or want to propose another metric? Please consider open an [issue](https://github.com/hoernschen/grasp/issues/new)

## Impact

These plugins take the carbon emission and show what kind of real world impact it can have on the world and its people

| Plugin | Description |
|--------------- | --------------- |
| [Social Cost of Carbon (SCC)](./src/lib/impact/SCC) | The amount of damages (in $) that can occur after emitting this amount of carbon (with different years) |
| [Death](./src/lib/impact/death) | The amount of deaths that can occur after emitting this amount of carbon |
| [Displacement](./src/lib/impact/displacement) | The amount of people that have to change their place of living after emitting this amout of carbon | 

## Comparison

These plugins take the carbon emissions and compare it with the emissions of a real world product or action.

| Plugin  | Description |
|-------------- | -------------- |
| [Bananas](./src/lib/comparison/bananas) | The amount of bananas that emit the same amount of carbon |
| [Chocolate](./src/lib/comparison/chocolate) | The amount of chocolate bars (with different types) that emit the same amount of carbon |
| [Coffee](./src/lib/comparison/coffee) | the amount of cups of coffee (with different varieties) that emit the same amount of carbon |
| [Distance](./src/lib/comparison/distance) | The distance you can travel (with different forms of transportation) while emitting the same amount of carbon |

## Install

You can install this collection by running the following command:

```
npm install -g https://github.com/hoernschen/grasp
```

We have provided a working example manifest file for you to test the plugins in this repo:

```sh
ie --manifest test.yml --output output
```
