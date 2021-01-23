var quiz = {
    data: [
    {
      q : "What does DOM stand for?",
      o : [
        "Data Operational Map",
        "Data Operations Management",
        "Document Object Model",
        "Data Object Model"
      ],
      a : 2 // arrays start with 0, so answer is 70 meters
    },
    {
        q : "What are Variables?",
        o : [
          "The easiest part of JavaScript",
          "A mathematical symbol that produces a result based on two values",
          "A way to package functionality",
          "Containers that store values"
        ],
        a : 3
    },
    {
        q : "Which of these is NOT an Operator?",
        o : [
          "Addition",
          "Subtraction",
          "Chuck Norris",
          "Equality"
        ],
        a : 2
      },
      {
        q : "What function does JavaScript serve in relation to a website?",
        o : [
          "It adds interactivity to a website ",
          "It's the bones",
          "It's the skin",
          "Nothing, it exists only to annoy programmers"
        ],
        a : 0
      },
      {
        q : "Which of these is a data dype?",
        o : [
          "Number",
          "String",
          "Boolean",
          "All of the above"
        ],
        a : 3
      }
      ],
      // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: function(){
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: function(){
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },
  
  // (D) OPTION SELECTED
  select: function(){
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) { 
      quiz.score++; 
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }
  
    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function(){
      if (quiz.now < quiz.data.length) { quiz.draw(); } 
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  }
};
window.addEventListener("load", quiz.init);