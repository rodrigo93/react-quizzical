import React, {useState} from "react";

// Components
import Quizzical from "./components/Quizzical";
import Questions from "./components/Questions";

export default function App () {
  const steps = ["initial", "question", "result"]
  const [currentStep, setCurrentStep] = useState(steps[0])

  function nextStep() {
    const currentIndex = steps.indexOf(currentStep)
    const nextIndex = currentIndex === steps.length - 1 ? 0 : currentIndex + 1
    setCurrentStep(steps[nextIndex])
  }

  return (
    <div className="app--container">
      {currentStep === "initial" && <Quizzical nextStep={nextStep} />}
      {["question", "result"].includes(currentStep) && <Questions currentStep={currentStep} nextStep={nextStep} />}
    </div>
  )
}