var _ = require('lodash');

var PouchDB = require('pouchdb');
var db = new PouchDB('choices');

db.allDocs({
        include_docs: true
    })
    .then(docs => {
        _.each(docs.rows, r => {
            r.doc.taste = palatability();
            console.log(r.doc.choice, r.doc.taste)
        });
    });

function palatability() {
    var scale = Math.round(Math.random() * 10);

    var taste;

    switch (true) {
    case (scale < 2):
        taste = "ugh";
        break;
    case (scale < 5):
        taste = "meh";
        break;
    case (scale < 8):
        taste = "tasty";
        break;
    default:
        taste = "sublime";
        break;
    }

    return taste;
}
