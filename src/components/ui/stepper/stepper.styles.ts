import type { StepperStatus } from "./stepper.types";

export const stepperNavStyles = "w-full";

export const stepperListStyles =
  "m-0 flex w-full list-none items-start gap-0 p-0";

export const stepperItemStyles = "relative flex min-w-0 flex-1 flex-col gap-2";

export const stepperIndicatorRowStyles = "flex w-full items-center";

const indicatorBaseStyles =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-[var(--font-family-sans)] text-[var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)] [font-weight:var(--typography-body-small-font-weight)] [letter-spacing:var(--typography-body-small-letter-spacing)]";

const indicatorStatusStyles: Record<StepperStatus, string> = {
  complete:
    "border-[var(--feedback-success-border)] bg-[var(--feedback-success-background)] text-[var(--feedback-success-content)]",
  current:
    "border-[var(--brand-primary-main)] bg-[var(--brand-primary-main)] !text-[var(--content-inverse)]",
  upcoming:
    "border-[var(--border-primary)] bg-[var(--background-primary)] text-[var(--content-tertiary)]",
};

const labelStatusStyles: Record<StepperStatus, string> = {
  complete: "text-[var(--content-secondary)]",
  current: "text-[var(--content-primary)]",
  upcoming: "text-[var(--content-tertiary)]",
};

const connectorStatusStyles: Record<Exclude<StepperStatus, "current">, string> = {
  complete: "bg-[var(--feedback-success-border)]",
  upcoming: "bg-[var(--border-primary)]",
};

export const stepperCheckIconStyles = "h-4 w-4 text-[var(--feedback-success-content)]";

export const stepperLabelBaseStyles =
  "mt-1 max-w-[140px] font-[var(--font-family-sans)] text-[var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)] [font-weight:var(--typography-body-small-font-weight)] [letter-spacing:var(--typography-body-small-letter-spacing)]";

export const stepperConnectorBaseStyles = "mx-2 h-[2px] min-w-2 flex-1 rounded-full";

export function getStepperIndicatorStyles(status: StepperStatus): string {
  return `${indicatorBaseStyles} ${indicatorStatusStyles[status]}`;
}

export function getStepperLabelStyles(status: StepperStatus): string {
  return `${stepperLabelBaseStyles} ${labelStatusStyles[status]}`;
}

export function getStepperConnectorStyles(status: Exclude<StepperStatus, "current">): string {
  return `${stepperConnectorBaseStyles} ${connectorStatusStyles[status]}`;
}
