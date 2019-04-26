# GraphQL-MongoDB Backend

## Start the project

**Clone project**: 
```git
git clone https://github.com/Max-Starling/Koa-GraphQL-MongoDB-Training.git
```
**Create database. You can do it via GUI like [MongoDB Compass](https://www.mongodb.com/products/compass), or by using [mongo shell](https://docs.mongodb.com/manual/mongo/)**:
```js
use your_db_name;   // create db or use existing one
db                  // display using db
```
**Create default "post", "author" collections. You can also create a new one**:
```js
 db.createCollection(post)
 db.createCollection(author)
 db.createCollection(your_collection_name)
```

**Now open [src/config/index.js](https://github.com/Max-Starling/Koa-GraphQL-MongoDB-Training/blob/master/src/config/index.js) and change db configuration**:
```js
const config = {
  development: {
    /*...*/
    dbUrl: 'your_db_url',
    dbName: 'your_db_name'
    /*...*/
  }
};
```

**Install node modules inside cloned folder and start the project**:
```npm
npm install
npm start
```

## GraphQL usage

**To use GraphQL server you need to send POST request with specific header to the http://localhost:4000/graphql**:
```http
POST 
Content-Type: application/graphql
```
**You can do it outside the project (recommended) via tools like [Postman](https://www.getpostman.com/) or do it inside via packages like [axious](https://github.com/axios/axios):**
```js
const your_request_body = { /*...*/ };
axious.post("http://localhost:4000/graphql", your_request_body, {
    headers: { Content-Type: "application/graphql" }
});
```
**Now you can pass GraphQL [queries and mutations](https://graphql.org/learn/queries/) in the request body as text**.  

**"Author" and "Post" schemas look like**:
```typescript
type Author {
  _id: ID!
  name: String!
  posts: [Post]
}

type Post {
  _id: ID!
  title: String!
  authorId: ID
  author: Author
}
```

**Queries are used to get data**:
```GraphQL
// get posts
query {
 posts { _id, title, author { name } }
}

// get post by id
query {
 post(_id: "your_post_id") { _id, title }
}

// get authors
query {
 posts { _id, name, posts { title } }
}

// get author by id
query {
 author(_id: "your_author_id") { _id, name }
}
```
**Mutations are used to modify (create, update, delete) data**:
```GraphQL
// create author and return it
mutation {
 createAuthor(name: "your_author_name") { _id, name }
}

// update author and return it
mutation {
 updateAuthor(_id: "your_author_id", name: "your_new_author_name") { _id, name }
}

// delete author and return it
mutation {
 deleteAuthor(name: "your_author_name") { _id, name }
}

// create post and return it
mutation {
 createPost(authorId: "your_author_id", title: "your_post_title") { _id, title }
}

// update post and return it
mutation {
 updatePost(_id: "your_post_id", title: "your_new_post_title") { _id, title }
}

// delete post and return it
mutation {
 deletePost(_id: "your_post_id") { _id, title }
}
```
