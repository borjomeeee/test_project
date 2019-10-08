const validate = require('../form');

module.exports = function($scope) {
    $scope.ratingNum = "";

    $scope.validateNumberRating = validate.validateNumberRating;
    $scope.validateString = validate.validateString;

    $scope.clearNumberRatingInput = validate.clearNumberRatingInput;
    $scope.clearSubjectInput = validate.clearSubjectInput;
}