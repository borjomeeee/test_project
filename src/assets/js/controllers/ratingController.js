const validate = require('../form');
const Alghoritms = require('../alghoritms');

let lessons = [
    [   "Философия 1",
        "Высшая математика 1",
        "Физика 1",
        "Программирование 1",
        "Английский язык 1",
        "История 1"
    ], 
    [   "Философия 2",
        "Высшая математика 2",
        "Физика 2",
        "Программирование 2",
        "Английский язык 2",
        "История 2"
    ],
    [   "Философия 3",
        "Высшая математика 3",
        "Физика 3",
        "Программирование 3",
        "Английский язык 3",
        "История 3"
    ],
    [   "Философия 4",
        "Высшая математика 4",
        "Физика 4",
        "Программирование 4",
        "Английский язык 4",
        "История 4"
    ]
]

let courses = [1, 2, 3, 4];

module.exports = function($scope, $http) {
    $scope.lessons = lessons[0];
    $scope.users = [];
    $scope.table = false;
    $scope.courses = courses;
    $scope.currCourse = courses[0];

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

    $scope.enterCourse = function(course) {
        $scope.currCourse = $scope.courses[course];
        $scope.lessons = lessons[$scope.currCourse - 1];
        $scope.subject = "";
    }

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
        if(validate.validateForm($scope.lessons)) {

            let user = new Object({
                course: $scope.currCourse,
                subject: $scope.subject,
                numRating: $scope.numRating,
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

            if(!status) {
                $scope.users.push(user);
                $http.post('data/check.php', $scope.users).then(function(responce) {
                    console.log(responce);
                }, function(error) {
                    console.log(error);
                })
            } 
        }
    };
}