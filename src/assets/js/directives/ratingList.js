module.exports = function() {
    return {
        restrict: 'E',
        template:   '<div class="scroll-rating rating" ng-repeat="rating in ratings | filter:ratingFilter">' +
                        '<label for="rating_{{ rating.id }}">Оценка {{ rating.id + 1 }}</label>' +
                        '<input' +
                            ' type="text"' +
                            ' name="rating_{{ rating.id }}"' +
                            ' class="rating-input"' +
                            ' ng-focus="clearRatingInput()"' +
                            ' ng-blur="validateRating(rating.value, rating.id)"' +
                            ' id="rating_{{ rating.id }}"' +
                            ' ng-module="rating.value">' +
                    '</div>'
    }
};