const validate = require('../form');

let lessons = [
    "Философия",
    "Высшая математика",
    "Физика",
    "Программирование",
    "Английский язык",
    "История"
]

module.exports = function($scope) {
    $scope.lessons = lessons;
    $scope.validateNumberRating = validate.validateNumberRating;
    $scope.validateString = lesson => validate.validateString(lesson, $scope.lessons);

    $scope.clearNumberRatingInput = validate.clearNumberRatingInput;
    $scope.clearSubjectInput = validate.clearSubjectInput;

    $scope.clearNumEmploy = validate.clearNumEmploy;
    $scope.validateNumEmploy = validate.validateNumEmploy;

    $scope.clearNumSuccessEmploy = validate.clearNumSuccessEmploy;
    $scope.validateNumSuccessEmploy = validate.validateNumSuccessEmploy;

    $scope.enterLesson = function(lesson) {
        $scope.subject = lesson;
        validate.clearSubjectInput($scope.subject);
    };

    $scope.checkNumEmploy = function() {
        if($scope.numEmploy < validate.minEmployNum)
            $scope.numEmploy = validate.minEmployNum;
    }

    $scope.checkNumSuccessEmploy = function() {
        if(isNaN($scope.numEmploy)) {
            return $scope.numSuccessEmploy = "";
        }
        if($scope.numSuccessEmploy < validate.minRatingNum)
            $scope.numSuccessEmploy = validate.minRatingNum;
        else if($scope.numSuccessEmploy > $scope.numEmploy)
            $scope.numSuccessEmploy = $scope.numEmploy;
    }

    $scope.validateForm = () => validate.validateForm(lessons);
}