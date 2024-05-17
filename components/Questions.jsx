import React, {useEffect, useState} from "react";
import he from "he";

import Question from "./Question";


function decodedStringArray(array) {
  return array.map((string) => he.decode(string))
}

function parsedQuestions(questions) {
  return questions.map((question, index) => {
    return {
      id: index,
      question: he.decode(question.question),
      answers: [...decodedStringArray(question.incorrect_answers), he.decode(question.correct_answer)].sort(() => Math.random() - 0.5),
      correctAnswer: he.decode(question.correct_answer),
      incorrectAnswers: decodedStringArray(question.incorrect_answers),
      userAnswer: null,
      isCorrect: null
    }
  })
}

export default function Questions({ currentStep, nextStep }) {
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
    if (showResult()) return;

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

  function showResult() {
    return currentStep === "result";
  }

  function correctAnswersAmount() {
    return questions.filter(question => question.isCorrect).length
  }

  function allAnswered() {
    return questions.every(question => question.userAnswer !== null)
  }

  // Remove this console.log
  console.log("Current Step: ", currentStep)

  return (
    <>
      {questions.length > 0 && (
        <div className="questions--container">
          {questions.map((question) => <Question question={question} setAnswer={setAnswer} showResult={showResult}/>)}

          {!showResult() && <button disabled={!allAnswered()} onClick={nextStep}>Check answers</button> }
          {showResult() && (
            <div className="questions--score-container">
              <span>You scored {correctAnswersAmount()}/{questions.length} correct answers</span>
              <button onClick={nextStep}>Play again</button>
            </div>
          )}
        </div>
      )}

      {questions.length <= 0 && <p>Loading...</p>}
    </>
  )
}