const Koa = require('koa');
const bodyParser = require('koa-bodyparser-graphql');
const {
  ApolloServer,
  gql
} = require('apollo-server-koa');
const defineRoutes = require('./defineRoutes');

const authors = [{
    id: 1,
    firstName: 'Tom',
    lastName: 'Coleman'
  },
  {
    id: 2,
    firstName: 'Sashko',
    lastName: 'Stubailo'
  },
  {
    id: 3,
    firstName: 'Mikhail',
    lastName: 'Novikov'
  },
];

const posts = [{
    id: 1,
    authorId: 1,
    title: 'Introduction to GraphQL',
    votes: 2
  },
  {
    id: 2,
    authorId: 2,
    title: 'Welcome to Meteor',
    votes: 3
  },
  {
    id: 3,
    authorId: 2,
    title: 'Advanced GraphQL',
    votes: 1
  },
  {
    id: 4,
    authorId: 3,
    title: 'Launchpad is Cool',
    votes: 7
  },
];


const schema = gql `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    authors: [Author]
    hello: String
    post(id: Int!): Post
  }

  type Mutation {
    createPost (
      authorId: Int
      title: String
    ) : Post

    upvotePost (
      id: Int!
    ): Post
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    authors: () => authors,
    post: (parent, {
      id
    }) => posts.find(item => item.id === id)
  },

  Mutation: {
    createPost: (parent, {
      authorId,
      title
    }, context, info) => {
      const id = 10 + Math.floor(Math.random() * 1000);
      const newPost = {
        id,
        authorId,
        title,
        votes: 0
      };

      posts.push(newPost);

      return newPost;
    },

    upvotePost: (parent, {
      id
    }) => {
      const post = posts.find(item => item.id === id);
      if (!post) {
        throw new Error(`Couldn't find post with id ${id}`);
      }
      post.votes += 1;
      return post;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config');

const app = new Koa();

app.on('error', (err, ctx) => {
  console.error('server error', err);
});

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

defineRoutes(app);

server.applyMiddleware({
  app,
  path: ''
});

app.listen({
  port: config.port
}, () => {
  console.warn(`Api server listening on ${config.port}, in ${process.env.NODE_ENV} mode`);
  console.log(server.graphqlPath);
});

module.exports = app;
