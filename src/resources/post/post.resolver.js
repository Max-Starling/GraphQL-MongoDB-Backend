const postService = require('./post.service');

module.exports = ({
  Query: {
    posts: () => postService.find(),
    post: (parent, query) => postService.findOne(query),
  },

  Mutation: {
    createPost: (parent, document) => postService.createPost(document),

    updatePost: async (parent, { _id, ...remainingDocument }) => {
      const post = await postService.find({ _id });;
      if (!post) {
        throw new Error(`Couldn't find post with id ${id}`);
      }
      return postService.updatePost({ _id }, remainingDocument);
    },

    deletePost: (parent, query) => postService.remove(query),
  },
});
