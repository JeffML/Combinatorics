var _ = require('lodash');

var PouchDB = require('pouchdb');
var db = new PouchDB('choices');

db.allDocs({
        include_docs: true
    })
    .then(docs => {
        _.each(docs.rows, r => {
            console.log(r.doc.choice, r.doc.taste, r.doc.key);
        });
    });
