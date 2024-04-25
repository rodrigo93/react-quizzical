import React from "react";
import Quizzical from "./components/Quizzical";

export default function App () {
  const steps = ["initial", "question", "result"]
  const [currentStep, setCurrentStep] = React.useState(steps[0])

  function nextStep() {
    const currentIndex = steps.indexOf(currentStep)
    const nextIndex = currentIndex === steps.length - 1 ? 0 : currentIndex + 1
    setCurrentStep(steps[nextIndex])
  }

  return (
    <div className="app--container">
      {currentStep === "initial" && <Quizzical handleClick={nextStep} />}
    </div>
  )
}