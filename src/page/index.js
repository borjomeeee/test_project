const ya = require('../assets/js/share')();
const ratingController = require('../assets/js/controllers/ratingController');

const scrollRating = require('../common.blocks/scrollRating/scrollRating');

let app = angular.module('ratingApp', []);

app.controller('ratingController', ['$scope', ratingController]);
app.directive('scrollRating', scrollRating);