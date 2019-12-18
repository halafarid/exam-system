var result = (function() {
        // Private

    var correctAnswers = localStorage.getItem('correctAnswers').split(','),
        userAnswers = localStorage.getItem('userAnswers').split(','),
        userScore = 0,
        quesCount = correctAnswers.length,
        result = quesCount / 2;

    // el data bta3t el user 
    var urlParams = new URLSearchParams(window.location.search);

    // Public
    return {
        // check about user answers with the correct answers & calculate user score
        checkAnswers: function() {
            for (var i = 0; i < quesCount; i++) {
                if (userAnswers[i] == correctAnswers[i]) {
                    userScore++;
                }
            }
            return userScore;
        },


        showScore: function() {
            document.querySelector('.result__score').textContent = 'Your Score = ' + userScore + ' / ' + quesCount;

            if (userScore <= result) {
                document.querySelector('.result__title').innerHTML = "Sorry <span>" + urlParams.get('Username') + "</span>, You failed in the exam";
                document.querySelector('.result__title').style.color = "#e12233";
            } else {
                document.querySelector('.result__title').textContent = "Congratulations " + urlParams.get('Username') + ", You passed in the exam";
                document.querySelector('.result__title').style.color = "#3ac05a";
            }
        },

        showTableResult: function() {
            var row = '<tr class="table__row"><td class="table__correct-answer">%correctAnswer%</td><td class="table__user-answer">%userAnswer%</td><td class="table__check">%result%</td></tr>';
            var newRow;

            for(var i = 0; i < quesCount; i++) {
                newRow = row.replace('%correctAnswer%', correctAnswers[i]);
                newRow = newRow.replace('%userAnswer%', userAnswers[i])

                if (userAnswers[i] == correctAnswers[i]) {
                    newRow = newRow.replace('%result%', '<i class="fas fa-check-circle table__check-correct"></i>')
                } else {
                    newRow = newRow.replace('%result%', '<i class="fas fa-times-circle table__check-wrong"></i>')
                }
             
                document.querySelector('.table__data').insertAdjacentHTML('beforeend', newRow);
            }
        },

        init: function() {
            this.checkAnswers();
            this.showScore();
            this.showTableResult();
        }
    }
})();

result.init();