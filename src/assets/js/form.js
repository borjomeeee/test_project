const numRating = $('#ratingNum');
const subject = $('#subject');

const numEmploy = $('#numEmploy');
const numSuccessEmploy = $('#numSuccessEmploy');

const MIN_EMPLOY_NUM = 0;

const MIN_RATING_NUM = 0;
const MAX_RATING_NUM = 20;

const MIN_RATING = 1;
const MAX_RATING = 5;

const dangerForm = "uk-form-danger";
const drop = $('#lessonDropdown');

function validateNumberRating(value) {
    if(value === "" || isNaN(value) || value < MIN_RATING_NUM || value > MAX_RATING_NUM)
        numRating.addClass(dangerForm);
}

function validateString(str, lessons) {
    if(lessons.indexOf(str) == -1)
        subject.addClass(dangerForm);
}

function validateRating(value, id) {
    if(value === "" || isNaN(value) || value < MIN_RATING || value > MAX_RATING) {
        $('#rating_' + id).removeClass('answered');
        $('#rating_' + id).addClass(dangerForm)

        return true;
    }

    $('#rating_' + id).addClass('answered')
    return false;
}

function validateNumEmploy(value) {
    if(value === "" || isNaN(value))
        return numEmploy.addClass(dangerForm);
}

function validateNumSuccessEmploy(value) {
    if(value === "" || numEmploy.val() === "" || isNaN(value) || isNaN(numEmploy.val()))
        return numSuccessEmploy.addClass(dangerForm);
}

function validateForm(lessons) {
    validateString(subject.val(), lessons);
    validateNumberRating(numRating.val());
    validateNumEmploy(numEmploy.val());
    validateNumSuccessEmploy(numSuccessEmploy.val());

    let ratings = $('.rating-input');
    ratings.each((indx, elem) => validateRating($(elem).val(), indx));

    if($('.' + dangerForm).length == 0) {
        return true;
    } else {
        UIkit.notification("<span uk-icon='icon: check'></span> Введите корректные данные!");
        return false;
    }
}

function validateRatingAll(num, success) {
    if(num != success) $('#label').addClass('uk-text-danger');
}

function clearRatingInput(id) {
    clearInput($('#rating_' + id));
    $('#label').removeClass('uk-text-danger');
}

function clearInput(elem) {
    elem.removeClass(dangerForm);
}

module.exports = {
    validateNumberRating: validateNumberRating,
    validateString: validateString,
    validateRating: validateRating,
    validateRatingAll: validateRatingAll,
    validateNumEmploy: validateNumEmploy,
    validateNumSuccessEmploy: validateNumSuccessEmploy,
    validateForm: validateForm,


    clearRatingInput: clearRatingInput,
    clearNumberRatingInput: () => clearInput(numRating),
    clearSubjectInput: () => clearInput(subject),
    clearNumEmploy: () => clearInput(numEmploy),
    clearNumSuccessEmploy: () => clearInput(numSuccessEmploy),


    minRatingNum: MIN_RATING_NUM,
    maxRatingNum: MAX_RATING_NUM,
    minRating: MIN_RATING,
    maxRating: MAX_RATING,
    minEmployNum:MIN_EMPLOY_NUM,

    hideDrop: UIkit.dropdown(drop).hide
}