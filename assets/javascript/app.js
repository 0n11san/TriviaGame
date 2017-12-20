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
  var tConverted = parseInt(t / 1000 / 60) + ":" + (t / 1000 % 60);
  
  //defines "setTime" function: after time runs out, says "Out of time!"
  setTimeout(function(){ alert("Out of Time!"); }, t);
  
  //appends a counter to the page that is updated while the game is running
  function setTime() {
   $("#timer").append(tConverted + " minutes");};
  
  //call "setTime" funtion
setTime();
  ;

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

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
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

  // Creates a list of the answer choices as radio inputs
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

  // Computes score and returns a paragraph element to be displayed
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
