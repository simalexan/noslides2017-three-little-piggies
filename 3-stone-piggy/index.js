const ApiBuilder = require('claudia-api-builder'),
  AWS = require('aws-sdk'),
  uuidv4 = require('uuid/v4');

var api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = api;

api.post('/piggies', function (request) {
  var parameters = {
    TableName: 'piggies',
    Item: {
      piggiesId: uuidv4(),
      piggiesName: request.body.piggiesName
    }
  };
  return dynamoDb
    .put(parameters)
    .promise()
}, { success: 201 });

api.get('/piggies', function (request) {
  return dynamoDb
    .scan({ TableName: 'piggies' })
    .promise()
    .then(response => response.Items);
}, { success: 200 });

api.get('/piggies/{id}', function (request) {
  var params = {
    TableName: 'piggies',
    Key: {
      piggiesId: request.pathParams.id
    }
  };
  return dynamoDb
    .get(params)
    .promise()
    .then(response => response.Item);
});

api.put('/piggies/{id}', function (request) {
  var parameters = {
    TableName: 'piggies',
    Key: {
      piggiesId: request.pathParams.id
    },
    UpdateExpression: 'set piggiesName = :n',
    ExpressionAttributeValues: {
      ':n': request.body.piggiesName
    },
    ReturnValues: 'UPDATED_NEW'
  };

  return dynamoDb
    .update(parameters)
    .promise();
});

api.delete('/piggies/{id}', function (request) {
  var parameters = {
    TableName: 'piggies',
    Key: {
      piggiesId: request.pathParams.id
    }
  };
  return dynamoDb
    .delete(parameters)
    .promise();
});
