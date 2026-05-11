import { Check } from "lucide-react";
import { cx } from "@/lib/cx";
import {
  getStepperConnectorStyles,
  getStepperIndicatorStyles,
  getStepperLabelStyles,
  stepperCheckIconStyles,
  stepperIndicatorRowStyles,
  stepperItemStyles,
  stepperListStyles,
  stepperNavStyles,
} from "./stepper.styles";
import type { StepperProps, StepperStatus } from "./stepper.types";

function getStepStatus(stepNumber: number, currentStep: number): StepperStatus {
  if (stepNumber < currentStep) return "complete";
  if (stepNumber === currentStep) return "current";
  return "upcoming";
}

function clampCurrentStep(step: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0;
  return Math.min(Math.max(step, 1), totalSteps);
}

export function Stepper({
  ariaLabel = "Progresso",
  className,
  currentStep,
  steps,
}: StepperProps) {
  const resolvedCurrentStep = clampCurrentStep(currentStep, steps.length);

  return (
    <nav aria-label={ariaLabel} className={cx(stepperNavStyles, className)}>
      <ol className={stepperListStyles}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const status = getStepStatus(stepNumber, resolvedCurrentStep);
          const isComplete = status === "complete";
          const isCurrent = status === "current";
          const hasConnector = index < steps.length - 1;

          return (
            <li className={stepperItemStyles} key={step.id}>
              <div className={stepperIndicatorRowStyles}>
                <span
                  aria-hidden="true"
                  className={getStepperIndicatorStyles(status)}
                >
                  {isComplete ? <Check className={stepperCheckIconStyles} /> : stepNumber}
                </span>

                {hasConnector ? (
                  <span
                    aria-hidden="true"
                    className={getStepperConnectorStyles(isComplete ? "complete" : "upcoming")}
                  />
                ) : null}
              </div>

              <span
                aria-current={isCurrent ? "step" : undefined}
                className={getStepperLabelStyles(status)}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export type { StepperItem, StepperProps, StepperStatus } from "./stepper.types";