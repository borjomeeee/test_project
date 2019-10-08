const validate = require('../form');
const Alghoritms = require('../alghoritms');

let lessons = [
    "Философия",
    "Высшая математика",
    "Физика",
    "Программирование",
    "Английский язык",
    "История"
]

module.exports = function($scope, $http) {
    $scope.lessons = lessons;
    $scope.users = [];
    $scope.table = false;

    $scope.validateNumberRating = (num) => {
        validate.validateNumberRating(num);
    }

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
        
        if($scope.numSuccessEmploy > $scope.numEmploy)
            $scope.numSuccessEmploy = $scope.numEmploy;
    }

    $scope.checkNumSuccessEmploy = function() {
        if(isNaN($scope.numEmploy)) {
            return $scope.numSuccessEmploy = "";
        }
        
        if($scope.numSuccessEmploy < validate.minEmployNum)
            $scope.numSuccessEmploy = validate.minEmployNum;
        else if($scope.numSuccessEmploy > $scope.numEmploy)
            $scope.numSuccessEmploy = $scope.numEmploy;
    }

    $scope.checkUsers = () => $scope.users.length != 0;

    $scope.showTable = () => {
        $scope.table = !$scope.table;
        return $scope.table;
    }

    $scope.validateForm = () => {
        if(validate.validateForm(lessons)) {

            let user = new Object({
                subject: $scope.subject,
                abcRating: Alghoritms.abcRating($scope.ratings),
                numEmploy: $scope.numEmploy,
                numSuccessEmploy: $scope.numSuccessEmploy,
                numEmployProcent: Alghoritms.numEmploy($scope.numEmploy, $scope.numSuccessEmploy)
            });
            user.grade = Alghoritms.grade(user.abcRating, user.numEmploy);

            let status = false;
            $scope.users.some(element => {
                if(angular.toJson(element) === angular.toJson(user)) 
                    return status = true;
            });

            if(!status) $scope.users.push(user);

            $http.post('data/check.php', $scope.users).then(function(responce) {
                console.log(responce);
            }, function(error) {
                console.log(error);
            })
        }
    };
}