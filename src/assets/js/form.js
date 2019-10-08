const numRating = $('#ratingNum');
const subject = $('#subject');

const MIN_RATING_NUM = 0;
const MAX_RATING_NUM = 20;

const MIN_RATING = 1;
const MAX_RATING = 5;

const dangerForm = "uk-form-danger";

function validateNumberRating(value) {
    if(!value || value.length == 0) return "";
    if(isNaN(value) || value < MIN_RATING_NUM || value > MAX_RATING_NUM)
        return numRating.addClass(dangerForm);
}

function validateString(str) {
    if(!str || str.length == 0) return "";
    if(!(/[а-яА-Яa-zA-Z]+$/.test(str)))
        subject.addClass(dangerForm);
}

function validateRating(value, id) {
    if(!value || value.length == 0) return "";
    if(isNaN(value) || value < MIN_RATING || value > MAX_RATING)
        return $('#rating_' + id).addClass(dangerForm);
}

function clearRatingInput(id) {
    clearInput($('#rating_' + id));
}

function clearInput(elem) {
    elem.removeClass(dangerForm);
}

module.exports = {
    validateNumberRating: validateNumberRating,
    validateString: validateString,
    validateRating: validateRating,
    clearRatingInput: clearRatingInput,
    clearNumberRatingInput: () => clearInput(numRating),
    clearSubjectInput: () => clearInput(subject),

    minRatingNum: MIN_RATING_NUM,
    maxRatingNum: MAX_RATING_NUM,
    minRating: MIN_RATING,
    maxRating: MAX_RATING
}