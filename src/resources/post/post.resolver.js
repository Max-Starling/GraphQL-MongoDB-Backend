const ObjectID = require('mongodb').ObjectID;
const postService = require('./post.service');

module.exports = ({
  Query: {
    posts: async () => {
      const posts = await postService.find();
      console.log(posts);
      return posts;
    },
    post: async (parent, { _id }) => {
      const post = await postService.find({ _id: ObjectID(_id) });
      return post;
    },
  },

  Mutation: {
    createPost: async (parent, document) => {
      const newPost = await postService.create(document);
      return newPost;
    },

    // updatePost: (parent, { id }) => {
    //   const post = posts.find(item => item.id === id);
    //   if (!post) {
    //     throw new Error(`Couldn't find post with id ${id}`);
    //   }
    //   return post;
    // },
  },
});
