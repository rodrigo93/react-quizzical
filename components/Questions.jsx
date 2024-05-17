import React, {useEffect, useState} from "react";
import Question from "./Question";

function parsedQuestions(questions) {
  return questions.map((question, index) => {
    return {
      id: index,
      question: question.question,
      answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
      correctAnswer: question.correct_answer,
      incorrectAnswers: question.incorrect_answers,
      userAnswer: null,
      isCorrect: null
    }
  })
}

export default function Questions({ nextStep }) {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
      .then(response => response.json())
      .then(data => setQuestions(parsedQuestions(data.results)))
  }, []);

  return (
    <div className="questions--container">
      <h1>Questions</h1>
      <p>Answer the following questions:</p>

      {questions.map((question) => <Question question={question} />)}

      <button onClick={nextStep}>Check answers</button>
    </div>
  )
}