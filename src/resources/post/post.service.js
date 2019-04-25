const createService = require('../../helpers/createService');
const wrapIdField = require('../../helpers/wrapIdField');

const service = createService('post');

service.createPost = document => service.create(wrapIdField(document, 'authorId'));

service.updatePost = (query, document) => service.update(query, wrapIdField(document, 'authorId'));

module.exports = service;
