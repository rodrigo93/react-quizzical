import React, {useEffect, useState} from "react";
import he from "he";

import Question from "./Question";


function parsedQuestions(questions) {
  return questions.map((question, index) => {
    return {
      id: index,
      question: he.decode(question.question),
      answers: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
      correctAnswer: he.decode(question.correct_answer),
      incorrectAnswers: question.incorrect_answers.map((answer) => he.decode(answer)),
      userAnswer: null,
      isCorrect: null
    }
  })
}

export default function Questions({ nextStep }) {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      .then(response => response.json())
      .then(data => setQuestions(parsedQuestions(data.results)))
  }, []);

  useEffect(() => {
    if (questions.length === 0) return

    const answers = questions.reduce((acc, question) => {
      acc[question.id] = question.userAnswer
      return acc
    }, {})

    setAnswers(answers)
  }, [questions])

  function setAnswer(id, answer) {
    setAnswers({
      ...answers,
      [id]: answer
    })
    setQuestions(questions.map(question => {
      if (question.id === id) {
        return {
          ...question,
          userAnswer: answer,
          isCorrect: answer === question.correctAnswer
        }
      }
      return question
    }))
  }

  return (
    <div className="questions--container">
      {questions.map((question) => <Question question={question} setAnswer={setAnswer}/>)}

      <button onClick={nextStep}>Check answers</button>
    </div>
  )
}