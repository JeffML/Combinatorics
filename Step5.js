const _ = require('lodash');
const hash = require('./hash');

const PouchDB = require('pouchdb');
const db = new PouchDB('choices');

db.allDocs({
        include_docs: true
    })
    .then(docs => {
        _.each(docs.rows, r => {
            r.doc.key = hash(r.doc.choice);
            db.put(r.doc);
        });
    })
    .catch(e => {
        console.error(e)
    });
