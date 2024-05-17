import React from "react";

export default function Question({question: {id, answers, correctAnswer, question, userAnswer, isCorrect}, setAnswer, showResult}) {
  function isSelected(option) {
    return userAnswer === option
  }

  function buttonClass(answer) {
    let tempClassName = "";

    if (showResult()) {
      tempClassName += "disabled "

      tempClassName += answer === correctAnswer ? "correct " : ""
      tempClassName += isSelected(answer) && !isCorrect ? "incorrect " : ""
    } else {
       tempClassName += isSelected(answer) ? "selected " : ""
    }

    return tempClassName;
  }

  return (
    <div className="question--container" key={id}>
      <h2>{question}</h2>
      <div className="question--answers">
        {answers.map((answer, index) => (
          <button className={buttonClass(answer)} key={index} onClick={() => setAnswer(id, answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}