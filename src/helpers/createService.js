const ObjectID = require('mongodb').ObjectID;

module.exports = (collectionName) => {
  if (!global.db) {
    logError('DB is not connected!');
    return;
  }

  try {
    const collection = global.db.collection(collectionName);
    const service = { ...collection };
  
    service.find = (...params) => collection.find(...params).toArray();

    service.create = async (document) => {
      try {
        const result = await collection.insertOne({ _id: new ObjectID(), ...document });
        return result.ops[0];
      } catch (e) {
        logError(e);
        return null;
      }
    };

    return service;
  } catch (e) {
    logError(e);
    return null;
  }
};
