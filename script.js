// The socket silently accepts orientation A.
// The opening failure is caused by a separate, one-time hidden condition.
const acceptedOrientation = "A";

let orientation = "A";
let attemptNumber = 1;
let finished = false;

const plug = document.querySelector("#plug");
const attemptMeta = document.querySelector("#attempt-meta");
const result = document.querySelector("#result");
const history = document.querySelector("#history");
const flipButton = document.querySelector("#flip-button");
const retryButton = document.querySelector("#retry-button");

function makeAttempt(shouldFlip) {
  if (finished) return;

  if (shouldFlip) {
    orientation = orientation === "A" ? "B" : "A";
    plug.classList.toggle("is-flipped");
  }

  attemptNumber += 1;

  // After the opening failure, orientation A can insert and orientation B cannot.
  // The interface reports only the outcome, never which condition mattered.
  const outcome = orientation === acceptedOrientation
    ? "Inserted"
    : "Blocked";

  attemptMeta.textContent = `Attempt ${attemptNumber} · Orientation ${orientation}`;
  result.textContent = outcome;
  result.className = outcome === "Inserted"
    ? "result is-inserted"
    : "result is-blocked";

  const historyItem = document.createElement("li");
  historyItem.dataset.outcome = outcome;
  historyItem.innerHTML = `
    <span>${attemptNumber}</span>
    <span>Orientation ${orientation}</span>
    <strong>${outcome}</strong>
  `;
  history.append(historyItem);

  if (outcome === "Inserted") {
    finished = true;
    flipButton.disabled = true;
    retryButton.disabled = true;
  }
}

flipButton.addEventListener("click", () => makeAttempt(true));
retryButton.addEventListener("click", () => makeAttempt(false));
