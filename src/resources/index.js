const mergeTypes = require('merge-graphql-schemas').mergeTypes;
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const PostSchema = require('./post/post.schema');
const PostResolver = require('./post/post.resolver');

const schemaArray = [PostSchema];
const resolverArray = [PostResolver];

module.exports = {
  typeDefs: mergeTypes(schemaArray, { all: true }),
  resolvers: mergeResolvers(resolverArray)
};
