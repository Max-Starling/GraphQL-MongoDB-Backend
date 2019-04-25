const authorService = require('./author.service');

module.exports = ({
  Query: {
    authors: async () => {
      const authors = await authorService.find();
      return authors;
    },
    author: async (parent, query) => {
      const author = await authorService.findOne(query);
      return author;
    },
  },

  Mutation: {
    createAuthor: async (parent, document) => {
      const newPost = await authorService.create(document);
      return newPost;
    },
    updateAuthor: async (parent, { _id, ...remainingDocument }) => {
      const author = await authorService.find({ _id });;
      if (!author) {
        throw new Error(`Couldn't find author with id ${id}`);
      }
      const updatedAuthor = authorService.update({ _id }, remainingDocument);
      return updatedAuthor;
    },
    deleteAuthor: async (parent, query) => { 
      const deletedAuthor = await authorService.remove(query);
      return deletedAuthor;
    },
  },
});
