/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _quiz = __webpack_require__(/*! ./quiz */ "./src/js/quiz.js");

var _question = __webpack_require__(/*! ./question */ "./src/js/question.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var endpoint = 'https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json';

var cardContent = document.querySelector('#cardContent');
var progressBars = document.querySelectorAll('.jsProgressBar');
var questionsBar = document.querySelector('#questionsBar');
var questionsLabel = document.querySelector('#questionsLabel');
var mistakesBar = document.querySelector('#mistakesBar');
var mistakesLabel = document.querySelector('#mistakesLabel');
var btnStart = document.querySelector('#btnStart');
var btnAnswers = document.querySelectorAll('.jsBtnAnswer');

var initialQuestionsLength = 0;
var quiz = new Object();

function showAnswers() {
    [].concat(_toConsumableArray(btnAnswers)).forEach(function (btn) {
        var val = parseInt(btn.dataset.value);
        btn.innerHTML = quiz.currentQuestion.answers[val].answer;
    });
}

function showProgress() {

    questionsBar.style.width = 100 * (quiz.questions.length / initialQuestionsLength) + '%';
    questionsLabel.innerHTML = quiz.questions.length + ' questions left';

    mistakesBar.style.width = quiz.mistakes * 2.5 + '%';
    mistakesLabel.innerHTML = quiz.mistakes + ' mistakes made';
}

function submitAnswerEvents() {
    [].concat(_toConsumableArray(btnAnswers)).forEach(function (btn) {
        btn.addEventListener('click', function () {
            var val = parseInt(btn.dataset.value);
            quiz.guess(val);
            play();
        });
    });
}

function renderQuizView() {
    [].concat(_toConsumableArray(btnAnswers)).forEach(function (btn) {
        return btn.classList.remove('hidden');
    });

    [].concat(_toConsumableArray(progressBars)).forEach(function (bar) {
        return bar.classList.remove('hidden');
    });

    initialQuestionsLength = quiz.questions.length;

    btnStart.classList.add('hidden');

    cardContent.classList.add('content-box__content--question');
}

function renderEndQuizView() {
    [].concat(_toConsumableArray(btnAnswers)).forEach(function (btn) {
        return btn.classList.add('hidden');
    });

    showResult();

    btnStart.classList.remove('hidden');
    btnStart.innerHTML = "Try again!";

    btnStart.removeEventListener('click', start);
    btnStart.addEventListener('click', function () {
        location.reload();
    });

    cardContent.classList.remove('content-box__content--question');

    [].concat(_toConsumableArray(progressBars)).forEach(function (bar) {
        return bar.classList.add('hidden');
    });
}

function showResult() {

    var text = !quiz.mistakes ? "Wow! Perfect score!" : quiz.mistakes < 0.5 * initialQuestionsLength ? "Pretty good! I'm sure you will nail the next round!" : "Oh. Don't worry. Next time will be better for sure!";

    cardContent.innerHTML = '<p> ' + text + ' </p>\n                            <h3> Summary </h3> \n                            <p> \n                                You\'ve answered <span class="sg-text sg-text--emphasised"> ' + initialQuestionsLength + ' questions </span> in <span class="sg-text sg-text--emphasised"> ' + quiz.turns + ' whops</span>.\n                            </p> \n\n                            <p> \n                                That means, on the way you\'ve made <span class="sg-text sg-text--peach sg-text--emphasised">' + quiz.mistakes + ' mistakes.</span> \n                            </p>';
}

function showCard() {

    // show question    
    cardContent.innerHTML = quiz.currentQuestion.question;

    // show quiz progress
    showProgress();

    // show answers
    showAnswers();
}

function play() {
    if (quiz.isEnded()) {
        renderEndQuizView();
    } else {
        showCard();
    }
}

function start() {
    renderQuizView();
    submitAnswerEvents();
    play();
}

document.addEventListener("DOMContentLoaded", function (event) {

    fetch(endpoint).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        data = JSON.parse(JSON.stringify(data));
        quiz = new _quiz.Quiz(data);

        btnStart.addEventListener('click', start);
    });
});

/***/ }),

/***/ "./src/js/question.js":
/*!****************************!*\
  !*** ./src/js/question.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Question = function () {
    function Question(question) {
        _classCallCheck(this, Question);

        this.question = question.question;
        this.answers = question.answers;
    }

    _createClass(Question, [{
        key: "isCorrect",
        value: function isCorrect(answerIndex) {
            return this.answers[answerIndex].correct;
        }
    }]);

    return Question;
}();

exports.Question = Question;

/***/ }),

/***/ "./src/js/quiz.js":
/*!************************!*\
  !*** ./src/js/quiz.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Quiz = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _question = __webpack_require__(/*! ./question */ "./src/js/question.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quiz = function () {
    function Quiz(questions) {
        _classCallCheck(this, Quiz);

        this.turns = 0;
        this.mistakes = 0;
        this.questions = [];
        this.createQuestions(questions);
        this.getCurrentQuestion();
    }

    _createClass(Quiz, [{
        key: 'createQuestions',
        value: function createQuestions(questions) {
            var _this = this;

            questions.forEach(function (question) {
                return _this.questions.push(new _question.Question(question));
            });
        }
    }, {
        key: 'getCurrentQuestion',
        value: function getCurrentQuestion() {
            this.currentQuestion = this.questions[0];
        }
    }, {
        key: 'isEnded',
        value: function isEnded() {
            return !this.questions.length;
        }
    }, {
        key: 'moveToBack',
        value: function moveToBack() {
            this.questions.push(this.questions.shift());
        }
    }, {
        key: 'removeQuestion',
        value: function removeQuestion() {
            this.questions.shift();
        }
    }, {
        key: 'guess',
        value: function guess(pickedAnswerIndex) {
            if (this.currentQuestion.isCorrect(pickedAnswerIndex)) {
                this.removeQuestion();
            } else {
                this.mistakes += 1;
                this.moveToBack();
            }
            this.turns += 1;
            this.getCurrentQuestion();
        }
    }]);

    return Quiz;
}();

exports.Quiz = Quiz;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map