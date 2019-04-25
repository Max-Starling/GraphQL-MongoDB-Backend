const mergeTypes = require('merge-graphql-schemas').mergeTypes;
const mergeResolvers = require('merge-graphql-schemas').mergeResolvers;

const PostSchema = require('./post/post.schema');
const PostResolver = require('./post/post.resolver');
const AuthorSchema = require('./author/author.schema');
const AuthorResolver = require('./author/author.resolver');

const schemaArray = [PostSchema, AuthorSchema];
const resolverArray = [PostResolver, AuthorResolver];

module.exports = {
  typeDefs: mergeTypes(schemaArray, { all: true }),
  resolvers: mergeResolvers(resolverArray)
};
