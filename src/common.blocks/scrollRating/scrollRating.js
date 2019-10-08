const form = require('../../assets/js/form');

module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: './assets/blocks/scrollRating.html',
        link: function(scope) {
            scope.ratings = [];
            scope.ratingSuccess = 0;

            scope.ratingCreate = function() {
                if(scope.ratingNum < form.minRatingNum)
                    scope.ratingNum = form.minRatingNum;
                else if(scope.ratingNum > form.maxRatingNum)
                    scope.ratingNum = form.maxRatingNum;

                while(!isNaN(scope.ratingNum) && scope.ratings.length != scope.ratingNum) {
                    if(scope.ratings.length > scope.ratingNum) scope.ratings.pop();
                    else scope.ratings.push({
                        id: scope.ratings.length,
                        value: ""
                    });
                }

            }

            scope.ratingFilter = elem => elem.id < scope.ratingNum;
            scope.clearRatingInput = form.clearRatingInput;
            scope.validateRating = (val, id) => {
                form.validateRating(val, id);

                scope.ratingSuccess = $('.rating-input.answered').length;
            }
        }
    }
};