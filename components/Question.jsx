import React from "react";

export default function Question({question: {id, answers, question, userAnswer}, setAnswer}) {
  function isSelected(option) {
    return userAnswer === option
  }

  return (
    <div className="question--container" key={id}>
      <h2>{question}</h2>
      <div className="question--answers">
        {answers.map((answer, index) => (
          <button className={isSelected(answer) ? "selected" : ""} key={index} onClick={() => setAnswer(id, answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}