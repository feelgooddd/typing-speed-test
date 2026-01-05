import "./css/timing.css";
import { useState } from "react";
import TimingMenu from "./TimingMenu";

const Timing = ({
  wpm,
  accuracy,
  difficulty,
  time,
  timeSetting,
  setTimeLeft,
  setTimeSetting,
  setDifficulty,
  testStarted,
}) => {
  const [menuType, setMenuType] = useState(null); // "time" | "difficulty"

  function handleTimeSelect(seconds) {
    if (testStarted) return;
    setTimeSetting(seconds);
    setTimeLeft(seconds);
  }

  function handleDifficultySelect(level) {
    if (testStarted) return;
    setDifficulty(level);
  }

  return (
    <section className="timing-section">
      <div className="timing-section__details">
        <div className="timing-section__details-WPM">
          <h3>WPM</h3>
          <p>{wpm}</p>
        </div>

        <div className="timing-section__details-accuracy">
          <h3>Accuracy:</h3>
          <p>{accuracy}%</p>
        </div>

        <div className="timing-section__details-time">
          <h3>Time:</h3>
          <p>{time}</p>
        </div>
      </div>

      <div className="timing-section__buttons">
        <button
          className="difficulty-btn"
          onClick={() => setMenuType("difficulty")}
        >
          {difficulty[0].toUpperCase() + difficulty.slice(1)}
        </button>

        <button
          className="time-btn"
          onClick={() => setMenuType("time")}
        >
          Timed {timeSetting}
        </button>
      </div>

      {menuType && (
        <TimingMenu
          type={menuType}
          onSelect={
            menuType === "time"
              ? handleTimeSelect
              : handleDifficultySelect
          }
          onClose={() => setMenuType(null)}
        />
      )}
    </section>
  );
};

export default Timing;
