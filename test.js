const _ = require('lodash');
const hash = require('./hash');

const PouchDB = require('pouchdb');
const db = new PouchDB('choices');

//dumpAll();
test();

function dumpAll() {
    db.query('choice/by_key', {
            include_docs: true
        })
        .then(function (res) {
            _.each(res.rows, (r) => {
                console.log(r.key, r.value, r.doc);
            })
        })
        .catch(function (err) {
            console.error(err);
        });
}

function test() {
    const choices = [
        [['VANILLA'], ['coconut flakes', 'pecans'], ['marshmallow']],
        [['CHOCOLATE'], ['pecans'], ['chocolate']],
        [['STRAWBERRY', 'VANILLA'], ['pineapple', 'coconut flakes'], ['marshmallow']],
        [['STRAWBERRY'], ['pecans'], ['maple']],
        [['VANILLA'], ['coconut flakes', 'pineapple'], ['chocolate']],
        [['CHOCOLATE', 'STRAWBERRY'], ['pineapple', 'pecans'], ['butterscotch']]
    ];

    const keys = _.map(choices, c => {
        return hash(c);
    });

    // console.log("keys = ", keys);

    db.query('choice/by_key', {
        keys: keys,
        include_docs: false,
    }, function (err, result) {
        if (err) {
            return console.error(err);
        }
        _.each(result.rows, (r, i) => {
            console.log(`${choices[i]} tastes ${r.value}`);
        })
    });
}
