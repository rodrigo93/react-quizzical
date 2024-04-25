import React from "react";

// Components
import Quizzical from "./components/Quizzical";
import Questions from "./components/Questions";

export default function App () {
  const steps = ["initial", "question", "result"]
  const [currentStep, setCurrentStep] = React.useState(steps[0])
  console.log("currentStep", currentStep) // DELETE this comment

  function nextStep() {
    const currentIndex = steps.indexOf(currentStep)
    const nextIndex = currentIndex === steps.length - 1 ? 0 : currentIndex + 1
    setCurrentStep(steps[nextIndex])
  }

  return (
    <div className="app--container">
      {currentStep === "initial" && <Quizzical nextStep={nextStep} />}
      {currentStep === "question" && <Questions nextStep={nextStep} />}
    </div>
  )
}