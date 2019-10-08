module.exports = {
    abcRating: function(ratings) {
        if(ratings.length == 0) return 0;

        let ball = 0;
        ratings.forEach(grade => {
            ball += parseInt(grade.value);
        });

        return (ball / ratings.length).toFixed(1);
    },
    numEmploy: function(num, success) {
        if(num == 0) return 0;

        return ((num - success) / num).toFixed(2) * 100;
    },
    grade: function(rating, employ) {
        if(rating > 4 && employ < 10)
            return 'зачет';
        return 'незачет';
    }
}