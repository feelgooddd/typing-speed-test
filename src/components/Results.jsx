import "./css/results.css";
import completedIcon from "../assets/images/icon-completed.svg";
import newPBIcon from "../assets/images/icon-new-pb.svg";
const Results = ({ wpm, accuracy, charsHit, charsMissed, resultVariant, handleReset }) => {
  


  return (
    <div className="first-results-wrapper">
      {(resultVariant === "nopb" || resultVariant === "firstpb") && (
        <img className="completed-img" src={completedIcon} />
      )}

      {resultVariant === "newpb" && <img src={newPBIcon} />}
      {resultVariant === "firstpb" && (
        <>
          <h2>Baseline Established!</h2>
          <p>
            You've set the bar. Now the real challenge begins – time to beat it.
          </p>
        </>
      )}
      {resultVariant === "newpb" && (
        <>
          <h2>High Score Smashed!</h2>
          <p>You're getting faster. That was incredible typing. </p>
        </>
      )}
      {resultVariant === "nopb" && (
        <>
          <h2>Test Complete!</h2>
          <p>Solid run. Keep pushing to beat your high score. </p>
        </>
      )}

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
      <button className="reset-test" onClick={handleReset}>Beat This Score</button>
    </div>
  );
};

export default Results;
