module.exports = `
  type Post {
    _id: ID!
    title: String!
    authorId: ID
    author: Author
  }

  type Query {
    post(_id: ID!): Post
    posts: [Post]
  }

  type Mutation {
    createPost (authorId: ID!, title: String!) : Post!
    updatePost (_id: ID!, title: String, authorId: ID) : Post!
    deletePost (_id: ID!): Post!
  }
`;
// createPost (post: CreatePostInput!) : Post!
// input CreatePostInput {
//   authorId: String!
//   title: String!
// }