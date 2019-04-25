const ObjectID = require('mongodb').ObjectID;
const wrapIdField = require('./wrapIdField');

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
      const modifiedQuery = wrapIdField(query);
      const result = await collection.find(modifiedQuery, projection).toArray();
      return result;
    }

    service.findOne = async (query, projection) => {
      const modifiedQuery = wrapIdField(query);
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
          wrapIdField(filter),
          { $set: update },
          {
            returnOriginal: false, 
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
      const modifiedQuery = wrapIdField(query);
      const result = await collection.findOneAndDelete(modifiedQuery);
      return result.value;
    };

    return service;
  } catch (e) {
    logError(e);
    return null;
  }
};
