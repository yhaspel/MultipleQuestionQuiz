/**
 * Created by Yuval on 8/5/2016.
 */

"use strict";


var quiz = angular.module("mymodule", []);

quiz.controller("QuizController", function BoardController($scope) {
    $scope.currentQuestion = 0;
    $scope.score = 0;

    $scope.questions = [
        {
            question: "Sum of 1 + 1?",
            options: [{opt: "3", sel: false}, {opt: "2", sel: false}, {opt: "43", sel: false}, {
                opt: "223",
                sel: false
            }],
            answer: 1,
            selected: -1,
            correct: false
        },
        {
            question: "When did the second world war start?",
            options: [{opt: "1945", sel: false}, {opt: "1939", sel: false}, {opt: "1944", sel: false}, {
                opt: "1942",
                sel: false
            }],
            answer: 1,
            selected: -1,
            correct: false
        },
        {
            question: "Who invented telephone?",
            options: [{opt: "Albert Einstein", sel: false}, {
                opt: "Alexander Graham Bell",
                sel: false
            }, {opt: "Isaac Newton", sel: false}, {opt: "Marie Curie", sel: false}],
            answer: 1,
            selected: -1,
            correct: false
        },
        {
            question: "Product of 12 * 11?",
            options: [{opt: "132", sel: false}, {opt: "24", sel: false}, {opt: "112", sel: false}, {
                opt: "201",
                sel: false
            }],
            answer: 0,
            selected: -1,
            correct: false
        },
        {
            question: "Who is Israel's Prime Minister?",
            options: [{opt: "Zehava Galon", sel: false}, {opt: "Gary Yurovsky", sel: false}, {
                opt: "Benhamin Netanyahu",
                sel: false
            }, {
                opt: "Yuval Ha-Mevulbal",
                sel: false
            }],
            answer: 2,
            selected: -1,
            correct: false
        },
        {
            question: "Which is the world's most populated country?",
            options: [{opt: "Russia", sel: false}, {
                opt: "Israel",
                sel: false
            }, {opt: "Germany", sel: false}, {opt: "China", sel: false}],
            answer: 3,
            selected: -1,
            correct: false
        }
    ];

    $scope.showScoreToggle = true;
    $scope.showScoreResult = true;
    $scope.navStatus = false;
    $scope.showUnansweredMessage = true;

    $scope.restart = function () {
        location.reload();
    };

    $scope.prevBtnStatus = function () {
        return $scope.currentQuestion == 0;
    };

    $scope.nextBtnStatus = function () {
        return $scope.currentQuestion == $scope.questions.length - 1;
    };

    $scope.showScore = function () {
        var scr = 0;
        for (var i = 0; i < $scope.questions.length; i++) {
            if ($scope.questions[i].correct) {
                scr++;
            }
        }
        $scope.score = parseInt(scr * (100 / $scope.questions.length));
        $scope.showScoreResult = false;
        $scope.navStatus = true;
        $scope.showUnansweredMessage = true;
    };

    var allQuestionsAnswered = function () {
        var answeredCounter = 0;
        for (var i = 0; i < $scope.questions.length; i++) {
            if ($scope.questions[i].selected != -1) {
                answeredCounter++;
            }
        }
        return answeredCounter === $scope.questions.length;
    };

    $scope.selectOption = function (option, qIndex) {
        for (var i = 0; i < $scope.questions[qIndex].options.length; i++) {
            if ($scope.questions[qIndex].options[i] == option) {
                $scope.questions[qIndex].selected = i;
                if ($scope.questions[qIndex].selected === $scope.questions[qIndex].answer) {
                    $scope.questions[qIndex].correct = true;
                }
                else {
                    $scope.questions[qIndex].correct = false;
                }
            }
        }
        $scope.showScoreToggle = !allQuestionsAnswered();
        if (allQuestionsAnswered()) {
            $scope.showUnansweredMessage = true;
        }
    };

    var toggleMessageAndSubmit = function (btn) {
        var cond = ($scope.currentQuestion === $scope.questions.length - 1);
        $scope.showUnansweredMessage = !(cond && btn === 'next' && !allQuestionsAnswered());
    };

    $scope.nextQuestion = function () {
        $scope.currentQuestion = Math.min(++$scope.currentQuestion, $scope.questions.length - 1);
        toggleMessageAndSubmit('next');
    };

    $scope.prevQuestion = function () {
        $scope.currentQuestion = Math.max(--$scope.currentQuestion, 0);
        toggleMessageAndSubmit('prev');
    };
});
