var _ = require('lodash');

var menu = {
  iceCream: {min: 1, max: 2, values: ["CHOCOLATE", "STRAWBERRY", "VANILLA", "BUTTERSCOTCH"]},
  topping: {min: 0, max: 2, values: ["pineapple", "strawberry", "coconut flakes", "pecans"]},
  syrup: {min:0, max: 1, values: ["chocolate", "marshmallow", "butterscotch", "maple"]}
}

/*
makeSelection(itemKey, comboList, comboIndex)
  select one (or none)
  makeSelection(itemKey+1 , comboList + 1, comboIndex+1)
  resolve
*/

var Combiner = function(opts) {
  var combos = [];
  function combo(active, rest) {
      if (rest.length == 0) {
        if (active.length >= (opts.min||0) &&
            active.length <= (opts.max||active.length))
          combos.push(active);
      } else {
          combo(active.concat(rest[0]), rest.slice(1, rest.length));
          combo(active, rest.slice(1, rest.length));
      }
      return this;
  }
  return {
    combos: combos,
    combo: combo
  }
}

var iceCreamChoices = new Combiner({min:menu.iceCream.min, max: menu.iceCream.max})
    .combo([], menu.iceCream.values)
    .combos;

var toppingChoices = new Combiner({min:menu.topping.min, max: menu.topping.max})
    .combo([], menu.topping.values)
    .combos;

var syrupChoices = new Combiner({min:menu.syrup.min, max: menu.syrup.max})
    .combo([], menu.syrup.values)
    .combos;

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
