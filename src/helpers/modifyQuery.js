const ObjectID = require('mongodb').ObjectID;

module.exports = (query) => {
  let modifiedQuery = query;
  if (query && query._id) {
    const { _id, ...remainingQuery } = query;
    modifiedQuery = {
      _id: ObjectID(_id),
      ...remainingQuery,
    };
  }
  return modifiedQuery;
};
