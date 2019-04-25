const ObjectID = require('mongodb').ObjectID;

module.exports = (query, idField = '_id') =>
  query && query[idField]
    ? ({
      ...query,
      [idField]: ObjectID(query[idField]),
    })
    : query;