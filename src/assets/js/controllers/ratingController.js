const validate = require('../form');

let lessons = {
    "1": [
        'Algebra 1 class',
        'Geomethry 1 class',
        'Russian 1 class',
        'Biology 1 class',
        'Phisics 1 class',
        'Chemistry 1 class',
        'English 1 class'
    ],
    "2": [
        'Algebra 2 class',
        'Geomethry 2 class',
        'Russian 2 class',
        'Biology 2 class',
        'Phisics 2 class',
        'Chemistry 2 class',
        'English 2 class'
    ],
    "3": [
        'Algebra 3 class',
        'Geomethry 3 class',
        'Russian 3 class',
        'Biology 3 class',
        'Phisics 3 class',
        'Chemistry 3 class',
        'English 3 class'
    ],
    "4": [
        'Algebra 4 class',
        'Geomethry 4 class',
        'Russian 4 class',
        'Biology 4 class',
        'Phisics 4 class',
        'Chemistry 4 class',
        'English 4 class'
    ]
};

const MIN_RATING_NUM = 0;
const MAX_RATING_NUM = 20;

module.exports = function($scope) {
    $scope.lessons = lessons;
    $scope.ratingNum = "";

    $scope.ratings = [];
    for(let i = MIN_RATING_NUM; i < MAX_RATING_NUM; i++)
        $scope.ratings.push({
            id: i,
            value: i
        });

    $scope.validateNumberRating = (val) => validate.validateNumberRating(val, MIN_RATING_NUM, MAX_RATING_NUM);
    $scope.validateString = validate.validateString;

    $scope.clearNumberRatingInput = validate.clearNumberRatingInput;
    $scope.clearSubjectInput = validate.clearSubjectInput;

    $scope.ratingFilter = function(elem) {
        return elem.id < $scope.ratingNum;
    }
}