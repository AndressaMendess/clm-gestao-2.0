const LOCK_COUNT_DATASET_KEY = "clmScrollLockCount";
const PREVIOUS_OVERFLOW_DATASET_KEY = "clmScrollLockPreviousOverflow";

export function lockBodyScroll(): () => void {
  if (typeof document === "undefined") return () => undefined;

  const body = document.body;
  const currentCount = Number(body.dataset[LOCK_COUNT_DATASET_KEY] ?? "0");

  if (currentCount === 0) {
    body.dataset[PREVIOUS_OVERFLOW_DATASET_KEY] = body.style.overflow;
    body.style.overflow = "hidden";
  }

  body.dataset[LOCK_COUNT_DATASET_KEY] = String(currentCount + 1);

  let released = false;

  return () => {
    if (released) return;
    released = true;

    const activeCount = Number(body.dataset[LOCK_COUNT_DATASET_KEY] ?? "0");
    const nextCount = Math.max(0, activeCount - 1);

    if (nextCount === 0) {
      const previousOverflow = body.dataset[PREVIOUS_OVERFLOW_DATASET_KEY] ?? "";
      body.style.overflow = previousOverflow;
      delete body.dataset[LOCK_COUNT_DATASET_KEY];
      delete body.dataset[PREVIOUS_OVERFLOW_DATASET_KEY];
      return;
    }

    body.dataset[LOCK_COUNT_DATASET_KEY] = String(nextCount);
  };
}
