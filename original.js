var _ = require('lodash');

var PouchDB = require('pouchdb');
var db = new PouchDB('choices2');
var Combinator = require('./combinator');

// remove old
db.destroy(null, function () {
    db = new PouchDB('choices2');
    run();
});

function run() {
    var menu = {
        iceCream: {
            min: 1,
            max: 2,
            values: ["CHOCOLATE", "STRAWBERRY", "VANILLA"]
        },
        topping: {
            min: 0,
            max: 2,
            values: ["pineapple", "strawberry", "coconut flakes", "pecans"]
        },
        syrup: {
            min: 0,
            max: 1,
            values: ["chocolate", "marshmallow", "butterscotch", "maple"]
        }
    }

    var iceCreamChoices = new Combinator({
            min: menu.iceCream.min,
            max: menu.iceCream.max
        })
        .combine([], menu.iceCream.values)
        .combinations;

    var toppingChoices = new Combinator({
            min: menu.topping.min,
            max: menu.topping.max
        })
        .combine([], menu.topping.values)
        .combinations;

    var syrupChoices = new Combinator({
            min: menu.syrup.min,
            max: menu.syrup.max
        })
        .combine([], menu.syrup.values)
        .combinations;

    var count = 0;
    var total = iceCreamChoices.length * toppingChoices.length * syrupChoices.length;
    var postCount = 0;
    var postCountMax = 5;

    _.each(iceCreamChoices, function (ic) {
        _.each(toppingChoices, function (tp) {
            _.each(syrupChoices, function (sy) {
                var si = setInterval(() => {
                    if (postCount < postCountMax) {
                        clearInterval(si);
                        postChoice(ic, tp, sy);
                    }
                }, 10);
            })
        })
    });

    function postChoice(ic, tp, sy) {
        ++postCount;
        db.post({
            choice: [ic, tp, sy]
        }, function (err, doc) {
            --postCount;
            done(err);
        });
    }

    function done(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log(`stored ${++count}`);
        if (count === total) {
            console.log('done');
        }
    }
}
