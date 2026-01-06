import "./css/resultsfirst.css";
import completedIcon from "../assets/images/icon-completed.svg";

const ResultsFirst = ({ wpm, accuracy, charsHit, charsMissed }) => {
  return (
    <div className="first-results-wrapper">
      <img src={completedIcon} />
      <h2>Baseline Established!</h2>
      <p>
        You've set the bar. Now the real challenge begins - time to beat it.
      </p>
      <div className="results-cards">
        <div className="results-cards__card">
          <p>WPM:</p>
          {wpm}
        </div>
        <div className="results-cards__card">
          <p>Accuracy:</p>
          <span
            className={
              accuracy > 95
                ? "results-accuracy accuracy-good"
                : "results-accuracy accuracy-bad"
            }
          >
            {accuracy} %
          </span>
        </div>
        <div className="results-cards__card">
          <p>Characters:</p>
          <div>
            <span className="correct-chars">{charsHit}</span>
            <span className="chars-slash"> / </span>
            <span className="incorrect-chars">{charsMissed}</span>
          </div>
        </div>
      </div>
      <button className="reset-test">
        Beat This Score
      </button>
    </div>
  );
};

export default ResultsFirst;
