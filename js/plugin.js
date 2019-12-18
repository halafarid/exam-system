var dataController = (function() {
    // Private
// Function Constructor for questions
function Questions(question, choices, correct) {
    this.question = question;
    this.choices = choices;
    this.correct = correct;
}

var data = {
    userScore: 0,
    correctAnswers: [],
    userAnswers: [],
    randomArr: []
}

    // Public
return {
    // All Questions
    makeQues: function() {
        return {
            q0: new Questions('what is the last version of HTML ? ', ['2', '3', '4', '5'], '5'),
            q1: new Questions('<div> element is normally displayed as ?', ['block-inline', 'inline-block', 'block', 'inline'], 'block'),
            q2: new Questions('Choose the correct HTML element for the largest heading :', ['head', 'heading', 'h1', 'h6'], 'h1'),
            q3: new Questions('Choose the correct HTML element for the smallest heading :', ['head', 'heading', 'h1', 'h6'], 'h6'),
            q4: new Questions('What is the correct HTML element for inserting a line break ?', ['lb', 'break', 'hr', 'br'], 'br'),
            q5: new Questions('Which character is used to indicate an end tag ?', ['^', '/', '*', '-'], '/'),
            q6: new Questions('How can you make a numbered list ?', ['ol', 'ul', 'dl', 'list'], 'ol'),
            q7: new Questions('Which HTML element defines the title of a document ?', ['meta', 'title', 'head', 'body'], 'title'),
            q8: new Questions('What is the correct HTML element for playing video files ?', ['media', 'movie', 'audio', 'video'], 'video'),
            q9: new Questions('Which HTML element defines navigation links ?', ['nav', 'navbar', 'navigate', 'navigation'], 'nav'),
        }
    },

    // array feha random numbers 3la ad 3dd el as2la (msh mtkrra)
    makeRandomQues: function(quesCount) {
        while (data.randomArr.length < (quesCount / 2 )) {
            var randomNum = Math.floor(Math.random() * quesCount);
            if(!data.randomArr.includes(randomNum)) {
                data.randomArr.push(randomNum);
            }
        }
        return data.randomArr;
    },

    // Save all correct answers to an array
    saveCorrectAnswers: function(allQuestions) {
        var random = data.randomArr;
        // 3shan lw kan el choice aktr mn klma y5lehom kolhom laz2en fe b3d
        for (let i =0; i < random.length; i++) {
            var choiceOneWord = allQuestions['q'+random[i]].correct.replace(/ /g, "");
            data.correctAnswers.push(choiceOneWord);
            data.userAnswers.push("");
        }
    },

    // To access the local variables
    getData: function() {
        return {
            userScore: data.userScore,
            userAnswers: data.userAnswers,
            correctAnswers: data.correctAnswers,
            randomArr: data.randomArr
        }
    }
}
})();


var uiController = (function() { 
    // Private

// el data bta3t el user 
var urlParams = new URLSearchParams(window.location.search);

    // Public
return {
    // Display one question
    displayQues: function(allQuestions, index, ind) {
        var quesCount = Object.keys(allQuestions).length;
        document.querySelector('.exam__count').textContent = 'Question No. ' + (ind+1) +' of ' + (quesCount / 2);
        
        // bms7 el so2al el 2dem w b7ot el gded
        document.querySelector('.exam__question').innerHTML = '<div class="exam__question"><h3 class="exam__question-title"></h3><form class="exam__question-choices"></form></div>';
        // 3dd e5tyarat so2al wa7d
        var choicesCount = allQuestions['q'+index].choices.length;
        
        // document.querySelector('.question').textContent = (index+1) + '- ' + allQuestions['q'+index].question;
        document.querySelector('.exam__question-title').textContent = allQuestions['q'+index].question;
        
        
        // Display the choices for each question
        for(var j = 0; j < choicesCount; j++) {
            // 3shan lw kan el choice aktr mn klma y5lehom kolhom laz2en fe b3d
            var choiceOneWord = allQuestions['q'+index].choices[j].replace(/ /g, "");
            document.querySelector('.exam__question-choices').insertAdjacentHTML('afterbegin', '<label class="exam__question-choice"><input type="radio" name="choice" class="choice-input" value= ' + choiceOneWord + '>' + '<span class="choice-text">'+allQuestions['q'+index].choices[j]+'</span></label>');
        }
        
        // lma ados 3la ay choice automatic y7to fe array bta3t el userAnswers
        document.forms[0].addEventListener('click', function() {
            var answer = document.forms[0].choice.value;
            dataController.getData().userAnswers.splice(ind, 1, answer);
            console.log(dataController.getData().userAnswers)
            uiController.showFinishBtn();
        });
    },
    
    addToSkipList: function(i) {
        // lw m5tarsh 7aga by5le mkano fel array fady
        // userAnswers.splice(i, 1, "");

        // check el so2al da mwgod fel skip abl kda wla l2
        if(!document.querySelector('.desc__skipList').contains(document.getElementById('q'+i)) ) {
            // lw msh mwgod hydefo .. lw kan mwgoud abl kda msh hydefo tany
            document.querySelector('.desc__skipList').insertAdjacentHTML('beforeend', `<div class="desc__skip"><span id=q${i} class="desc__skip-ques">${(i+1)}</span></div>`);
        }
    },

    // msh hyzhr el finish button ela lma y7l kol el as2la
    showFinishBtn: function() {
        var userAnswers = dataController.getData().userAnswers;
        var correctAnswersLen = dataController.getData().correctAnswers.length;            

        if (userAnswers.length === correctAnswersLen && userAnswers.indexOf("") == -1) {
            document.querySelector('.btn-finish').disabled = false;
        } else {
            document.querySelector('.btn-finish').disabled = true;
        }
    },

    // emta yzhar el next wel previous button
    showNextPrevBtn: function(index, quesCount) {
        if (index === 0) {
            document.querySelector('.btn-next').disabled = false;
            document.querySelector('.btn-prev').disabled = true;

        } else if (index == ((quesCount / 2) - 1) ) {
            document.querySelector('.btn-next').disabled = true;
            document.querySelector('.btn-prev').disabled = false;
        } else {
            document.querySelector('.btn-next').disabled = false;
            document.querySelector('.btn-prev').disabled = false;
        }
    },

    // el data bta3t el user
    showUserData: function() {
        for (var [key, value] of urlParams) {
            document.querySelector('.desc__user').insertAdjacentHTML('beforeend', `<p class="desc__user-data"><span class="desc__user-data-value">${key} : </span> ${value}</p>`);
        }
    },

    showTimer: function() {
        var minutes = 1;
        var seconds = 0;

        var interval = setInterval(function() {
            if (seconds == 0 && minutes == 0) {
                minutes = '00';
                seconds = '00';
                clearInterval(interval);
                document.querySelector('.exam__modal').style.opacity = 1;
                document.querySelector('.exam__modal').style.display = 'block';
                
            } else if (seconds == 0 && minutes !== 0) {
                seconds = 59;
                minutes--;
                
            } else if (seconds < 10) {
                seconds = '0' + seconds;

            } else if (minutes == 0 && seconds < 20) {
                document.querySelector('.desc__time').style.color = '#e12233';
            }
            
            document.querySelector('.desc__time').textContent = minutes + ' : ' + seconds;
            seconds--;

        }, 1000);

        interval;
    },

}
})();


var appController = (function(dataCtrl, uiCtrl){
    // Private
var index = 0;

// array feha arkam 3shwa2ya hgeb mnhom el as2la
var random = dataCtrl.makeRandomQues(6);

// Object -> {q1: Questions, q2: Questions, q3: Questions}
var allQuestions = dataCtrl.makeQues();

// 3dd el as2la kolha
var quesCount = Object.keys(allQuestions).length;

// el data bta3t el user 
var urlParams = new URLSearchParams(window.location.search);
var usp = urlParams.toString();

function checkChoice(index) {
    // el choice ely el user e5taro mn el choices
    var answer = document.forms[0].choice.value;
    // var userAnswers = dataCtrl.getData().userAnswers;

    // lw hwa m5tarsh
    if (answer == "") {
        uiCtrl.addToSkipList(index);
        handleSkip(index);
    }
}

// lma ados 3la ay so2al mn ely fel skipList
function handleSkip(i) {
    document.getElementById('q'+i).addEventListener('click', function() {
        // hy3rdly el so2al ely dost 3leh
        console.log( dataCtrl.getData().userAnswers)
        uiCtrl.displayQues(allQuestions, random[i], i);
        uiCtrl.showNextPrevBtn(i, quesCount);

        // lw hwa kan etgawb 3leh yzhr egabto
        var ans = dataCtrl.getData().userAnswers;
        if (ans[i] !== "") {
            document.querySelector(`.choice-input[value= "${ans[i]}"]`).setAttribute("checked", "checked");
        }

        index = i;
        return index;
    });
}

// Mark Button
function skipQuestion() {
    var skipQuesCount = document.querySelectorAll('.desc__skip-ques').length;
    console.log(skipQuesCount)
    if (skipQuesCount < ((quesCount / 2) - 1) ) {
        var index = nextQuestion();
        index = index - 1;

        uiCtrl.addToSkipList(index);
        handleSkip(index);
    } 
}

// Next Button
function nextQuestion() {
    var ans = dataCtrl.getData().userAnswers;
    checkChoice(index);
    index++;

    uiCtrl.displayQues(allQuestions, random[index], index);
    uiCtrl.showNextPrevBtn(index, quesCount);

    // lw kan m7lol abl kda hyzhr egabto
    if (ans[index] !== "") {
        document.querySelector(`.choice-input[value= "${ans[index]}"]`).setAttribute("checked", "checked");
    }
    return index;
}

// Previous Button
function prevQuestion() {
    var ans = dataCtrl.getData().userAnswers;
    
    checkChoice(index);
    index--;

    uiCtrl.displayQues(allQuestions, random[index], index);
    uiCtrl.showNextPrevBtn(index, quesCount)
    
    // lw kan m7lol abl kda hyzhr egabto
    if (ans[index] !== "") {
        document.querySelector(`.choice-input[value= "${ans[index]}"]`).setAttribute("checked", "checked");
    }
}

// Finish Button
function finishExam() {
    // Save the last answer to the array (3shan m3dsh feh btn next)
    checkChoice(index)

    var correctAnswers = dataCtrl.getData().correctAnswers;
    var userAnswers = dataCtrl.getData().userAnswers;

    // var questionsCount = (quesCount / 2);
    localStorage.setItem('correctAnswers', correctAnswers);
    localStorage.setItem('userAnswers', userAnswers);

    window.location.href = 'result.html'.concat('?' + usp);
}

    // Public
return {
    init: function() {
        console.log(dataController.getData().userAnswers)

        localStorage.setItem('userAnswers', dataCtrl.getData().userAnswers);
        // Timer
        uiCtrl.showTimer();
        // Diplay user Data
        uiCtrl.showUserData();
        // Display Number of question
        document.querySelector('.exam__count').textContent = 'Question No. 1 of ' + (quesCount / 2);

        // Display first question
        var randomQues = dataCtrl.makeRandomQues(quesCount);
        uiCtrl.displayQues(allQuestions, randomQues[0], 0);

        // Save all correct answers to an array
        dataCtrl.saveCorrectAnswers(allQuestions);

        // Handle next Button
        document.querySelector('.btn-next').addEventListener('click', nextQuestion);
        // Handle Previous Button
        document.querySelector('.btn-prev').addEventListener('click', prevQuestion);
        // Handle Skip Button
        document.querySelector('.btn-skip').addEventListener('click', skipQuestion);
        // Handle Finish Button
        document.querySelector('.btn-finish').addEventListener('click', finishExam);
        // Handle show result button (lma el timer y5ls)
        document.querySelector('.btn-result').addEventListener('click', finishExam);
        
        console.log(dataCtrl.getData().correctAnswers)
    }
}
})(dataController, uiController);


appController.init();


