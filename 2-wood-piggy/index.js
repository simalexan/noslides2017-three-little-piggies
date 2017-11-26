const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

module.exports = api;

api.get('/noslidesconf', function (req){
  return 'Buongiorno NoSlidesConf!';
});

