const ya = require('../assets/js/share')();
const ratingController = require('../assets/js/controllers/ratingController');
const ratingList = require('../assets/js/directives/ratingList');

let app = angular.module('ratingApp', []);

app.controller('ratingController', ['$scope', ratingController]);
app.directive('ratinglist', ratingList);