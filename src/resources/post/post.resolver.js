const postService = require('./post.service');

module.exports = ({
  Query: {
    posts: async () => {
      const posts = await postService.find();
      return posts;
    },
    post: async (parent, query) => {
      const post = await postService.findOne(query);
      return post;
    },
  },

  Mutation: {
    createPost: async (parent, document) => {
      const newPost = await postService.create(document);
      return newPost;
    },
    updatePost: async (parent, { _id, ...remainingDocument }) => {
      const post = await postService.find({ _id });;
      if (!post) {
        throw new Error(`Couldn't find post with id ${id}`);
      }
      const updatedPost = postService.update({ _id }, remainingDocument);
      return updatedPost;
    },
    deletePost: async (parent, query) => { 
      const deletedPost = await postService.remove(query);
      return deletedPost;
    },
  },
});
