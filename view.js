const PouchDB = require('pouchdb');
const db = new PouchDB('choices');

// doc that defines the view
var ddoc = {
    _id: '_design/choice',
    views: {
        by_key: {
            map: function (doc) {
                emit(doc.key, doc.taste);
            }.toString()
        }
    }
};

// remove any existing view, then add new one:
db.get(ddoc._id)
    .then(doc => {
        return db.remove(doc);
    })
    .then(() => {
        db.put(ddoc)
            .catch(function (err) {
                console.error(err);
            });
    });
