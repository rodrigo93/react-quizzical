import React from "react";

export default function Quizzical({handleClick}) {
  return (
    <div className="quizzical--container">
      <h1>Quizzical</h1>
      <p>Challenge your knowledge in this game of questions!</p>
      <button onClick={handleClick}>Start quiz</button>
    </div>
  )
}