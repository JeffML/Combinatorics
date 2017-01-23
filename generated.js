var _ = require('lodash');
var menu = require('./menu');

var CombinatorGenerator = require('./Combinator-generator');

function run() {
    var iceCreamChoiceIterator = new CombinatorGenerator({
            min: menu.iceCream.min,
            max: menu.iceCream.max
        })
        .combine([], menu.iceCream.values);

    console.log(iceCreamChoiceIterator)

    //console.log(iceCreamChoices);
    var it;
    do {
        it = iceCreamChoiceIterator.next();
        console.log("choice", it.value);
    } while (!it.done);
}

run();
