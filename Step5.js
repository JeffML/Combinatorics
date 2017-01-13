var _ = require('lodash');

var PouchDB = require('pouchdb');
var db = new PouchDB('choices');

var crypto = require('crypto');
const hmac =

    db.allDocs({
        include_docs: true
    })
    .then(docs => {
        _.each(docs.rows, r => {
            var str = _.flatten(r.doc.choice)
                .join('');
            r.doc.key = crypto.createHmac('sha256', 'old ice cream')
                .update(str)
                .digest('hex');
            db.put(r.doc);
        });
    })
    .catch(e => {
        console.error(e)
    });
