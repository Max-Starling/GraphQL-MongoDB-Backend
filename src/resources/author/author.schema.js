module.exports = `
  type Author {
    _id: ID!
    name: String!
    posts: [Post]
  }

  type Query {
    author(_id: ID!): Author
    authors: [Author]
  }

  type Mutation {
    createAuthor (name: String!) : Author!
    updateAuthor (_id: ID!, name: String) : Author!
    deleteAuthor (_id: ID!): Author!
  }
`;
