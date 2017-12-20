//all questions, corresponding answer options, and correct answer (index of choices) ---- all contained within objects
(function() {

  var questions = [{
    question: "Which of these films is widely considered as the seed from which Western reception for Japanese animation initially grew?",
    choices: ["Akira", "Castle in the Sky", "My Nieghbor Totoro", "DBZ", "Gundam Wing"],
    correctAnswer: 0
  }, {
    question: "Many consider this animation as the (uncredited) inspiration for Disney's 'Lion King'",
    choices: ["Mononoke Hime", "Redline", "Hamlet", "Kimba", "Porco Rosso"],
    correctAnswer: 3
  }, {
    question: "In contrast to Western studios, Studio Ghibli -- Japan's most famous group of animators, is well-known for casting its story leads as strong heroines. Which of the following is NOT such a Ghibli female character?",
    choices: ["San", "Nausicaa", "Lady Eboshi", "Kiki", "Sakura"],
    correctAnswer: 4
  }, {
    question: "The phrase 'Kamehameha' as uttered by Goku in the famous series 'Dragon Ball Z' originates from the name of a real life king from which country?",
    choices: ["Thailand", "New Zealand", "Cameroon", "Kenya", "Hawaii"],
    correctAnswer: 4
  }, {
    question: "There is an urban lengend surrounding this video game, created by DBZ's Akira Toriyama, stating that the company can only have new releases on weekends due to children as well as adults calling in sick to school/work in order to play the game on release day.",
    choices: ["Final Fantasy", "Dragon Quest", "Pokemon", "Sonic the Hedgehog", "Mario"],
    correctAnswer: 1
  },
  {
    question: "The following characters are from which anime: Sasuke, Kakashi, Rock Lee, Itachi, Madara, Guy Sensei ?",
    choices: ["Sailor Moon", "Gantz", "Naruto", ".Hack", "Beserk"],
    correctAnswer: 2
  },
  {
    question: "Spike is the main character of which jazz-inspired anime",
    choices: ["Trigun", "Tenchi Muyo", "Cowboy Bebop", "Big O", "Ronin Warriors"],
    correctAnswer: 2
  },
  {
    question: "Outlaw Star's Galactic Layline is...",
    choices: ["pure Looooove", "the Ultimate Ninjutsu", "Kingdom Hearts...is Light!", "a demon fruit that bestows amazing powers", "a universal library created by an advanced alien race"],
    correctAnswer: 4
  }

]
  //sets timeOut to be equal to 1 minutes per question
  var t = 1000*60*questions.length;


  //converts millisecond to stopwatch format e.g. "minutes : seconds"
  var tConverted = parseInt(t / 1000 / 60) + "." + (t / 1000 % 60);
  
  for (i=100; i < 10 && i > 0; i--){
    $("#timer").html("Start Over");
  }
  
  //***********TEST: after time runs out, says "Out of time!"**********
  // setTimeout(function(){ alert("Out of Time!"); }, t);
  
  //define displayScoreTimedOut function (slightly different from displayScore)
  function displayScoreTimedOut() {
    
    var numCorrect = 0;
    var numWrong = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
      else {
        numWrong++;
      }
    }

    var score = 'You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!! (And got ' + numWrong + ' wrong)';
    alert (score);
  }
  
  //after time runs out, go ahead and jump to displaying score function
  setTimeout(function(){ displayScoreTimedOut(); }, t);
    
  //define founction: appends a counter to the page that is updated while the game is running
  function setTime() {
   $("#timer").append(tConverted + " minutes");};

  
  //call funtion 
  //think i need to wrap this in a "setInterval" to have it auto update to the page. Do I need to do this outside of the higher function for it to work?
  
setTime();
;
  //decided to just make a new timer doc write below...
  document.getElementById('timer').innerHTML =
  08 + ":" + 00;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // distinuishes buttons when mouse hovers on top
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions as well as possible answers
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Turns the list of  answer choices into radio buttons
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Calculaters score and pushes paragraph element to display
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    var numWrong = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
      else {
        numWrong++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!! (And got ' + numWrong + ' wrong)');
    return score;
  }
})();
