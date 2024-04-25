import React from "react";

export default function Questions({ nextStep }) {
  return (
    <div className="questions--container">
      <h1>Questions</h1>
      <p>Answer the following questions:</p>
      <button onClick={nextStep}>Check answers</button>
    </div>
  )
}