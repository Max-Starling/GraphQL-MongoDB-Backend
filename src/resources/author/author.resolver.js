const authorService = require('./author.service');
const postService = require('../post/post.service');

module.exports = ({
  Query: {
    authors: async () => authorService.find(),
    author: async (parent, query) => authorService.findOne(query),
  },

  Mutation: {
    createAuthor: (parent, document) => authorService.create(document),
  
    updateAuthor: async (parent, { _id, ...remainingDocument }) => {
      const author = await authorService.find({ _id });;
      if (!author) {
        throw new Error(`Couldn't find author with id ${id}`);
      }
      return authorService.update({ _id }, remainingDocument);
    },
  
    deleteAuthor: (parent, query) => authorService.remove(query),
  },

  Author: {
    posts: ({ _id }) => postService.find({ authorId: _id }),
  }
});
