import React, {useState} from "react";
export default function Question({question: {id, answers, question}}) {
  const [selected, setSelected] = useState(null)

  function handleSelect(answer) {
    setSelected(answer)
  }

  return (
    <div className="question--container" key={id}>
      <h2>{question}</h2>
      <div className="question--answers">
        {answers.map((answer, index) => (
          <button key={index} onClick={() => handleSelect(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}