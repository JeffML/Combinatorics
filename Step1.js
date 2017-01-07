var _ = require('lodash');
var Combinator = require('./combinator');

var menu = {
  iceCream: {min: 1, max: 2, values: ["CHOCOLATE", "STRAWBERRY", "VANILLA"]},
  topping: {min: 0, max: 2, values: ["pineapple", "strawberry", "coconut flakes", "pecans"]},
  syrup: {min:0, max: 1, values: ["chocolate", "marshmallow", "butterscotch", "maple"]}
}

var iceCreamChoices = new Combinator({min:menu.iceCream.min, max: menu.iceCream.max})
    .combine([], menu.iceCream.values)
    .combinations;

var toppingChoices = new Combinator({min:menu.topping.min, max: menu.topping.max})
    .combine([], menu.topping.values)
    .combinations;

var syrupChoices = new Combinator({min:menu.syrup.min, max: menu.syrup.max})
    .combine([], menu.syrup.values)
    .combinations;

 console.log(iceCreamChoices);
 console.log(toppingChoices);
 console.log(syrupChoices);

var allChoices = [];

_.each(iceCreamChoices, function(ic) {
  _.each(toppingChoices, function(tp) {
    _.each(syrupChoices, function(sy) {
      allChoices.push([ic,tp,sy]);
    })
  })
})

console.log('***', allChoices);
