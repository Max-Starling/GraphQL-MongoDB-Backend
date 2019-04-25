module.exports = `
  type Post {
    _id: String!
    title: String!
    authorId: String
  }

  type Query {
    post(_id: String!): Post
    posts: [Post]
  }

  type Mutation {
    createPost (post: CreatePostInput!) : Post!
  }

  input CreatePostInput {
    authorId: String!
    title: String!
  }
`;
