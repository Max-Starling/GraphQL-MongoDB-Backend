const mongo = require('mongodb').MongoClient;
const config = require('../config');

module.exports = async (resolve, reject, force = true) => {
  if (global.db && !force) {
    if (resolve && typeof resolve === "function") {
      return resolve(global.db);
    }
    return global.db;
  }

  try {
    const client = await mongo.connect(config.dbUrl, { useNewUrlParser: true });
    global.db = client.db(config.dbName);
    warn(`Connected to MongoDB: "${config.dbUrl}"`);
    if (resolve && typeof resolve === "function") {
      resolve(global.db);
    }
    return global.db;
  } catch (err) {
    logError(err);
    // throw err;
    if (reject && typeof reject === "function") {
      reject(err);
    }
    return err;
  }
};
