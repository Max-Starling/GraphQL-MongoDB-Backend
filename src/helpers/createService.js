const ObjectID = require('mongodb').ObjectID;

const modifyQuery = (query) => {
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

module.exports = (collectionName, db) => {
  const database = db || global.db;

  if (!database) {
    logError('DB is not connected!');
    return;
  }

  try {
    const collection = database.collection(collectionName);
    const service = { ...collection };
  
    service.find = async (query, projection) => {
      const modifiedQuery = modifyQuery(query);
      const result = await collection.find(modifiedQuery, projection).toArray();
      return result;
    }

    service.findOne = async (query, projection) => {
      const modifiedQuery = modifyQuery(query);
      const result = await collection.findOne(modifiedQuery, projection);
      return result;
    }

    service.create = async (document) => {
      try {
        const result = await collection.insertOne({
          ...document,
          _id: new ObjectID(),
        });
        return result.ops[0];
      } catch (e) {
        logError(e);
        return null;
      }
    };

    service.update = async (filter, update, options) => {
      try {
        const result = await collection.findOneAndUpdate(
          modifyQuery(filter),
          { $set: update },
          {
            returnNewDocument: true, 
            ...options,
          },
        );
        return result.value;
      } catch (e) {
        logError(e);
        return null;
      }
    };

    service.remove = async (query) => {
      const modifiedQuery = modifyQuery(query);
      const result = await collection.findOneAndDelete(modifiedQuery);
      return result.value;
    };

    return service;
  } catch (e) {
    logError(e);
    return null;
  }
};
