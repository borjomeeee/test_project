const numRating = document.querySelector('#ratingNum');
const subject = document.querySelector('#subject');

const dangerForm = "uk-form-danger";

function validateNumberRating(value, min, max) {
    if(!value || value.length == 0) return "";
    if(isNaN(value) || value < min || value > max)
        return numRating.classList.add(dangerForm);
}

function validateString(str) {
    if(!str || str.length == 0) return "";
    if(!(/[а-яА-Яa-zA-Z]+$/.test(str)))
        subject.classList.add(dangerForm);
}

function validateRating() {

}

function clearInput(elem) {
    elem.classList.remove(dangerForm);
}

module.exports = {
    validateNumberRating: validateNumberRating,
    validateString: validateString,
    validateRating: validateRating,
    clearNumberRatingInput: () => clearInput(numRating),
    clearSubjectInput: () => clearInput(subject)
}