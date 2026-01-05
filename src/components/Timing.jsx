import "./css/timing.css";
import { useState } from "react";
import Menu from "./Menu";

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
  const timeOptions = [
    { label: "0:30", value: 30 },
    { label: "1:00", value: 60 },
    { label: "1:30", value: 90 },
  ];

  const difficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);

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
  {/* Difficulty Button + Menu */}
  <div className="timing-menu__wrapper">
    <button
      className="difficulty-btn"
      disabled={testStarted}
      onClick={() => setIsDifficultyOpen((o) => !o)}
    >
      {difficulty[0].toUpperCase() + difficulty.slice(1)}
    </button>
    {isDifficultyOpen && (
      <Menu
        options={difficultyOptions}
        onSelect={handleDifficultySelect}
        onRequestClose={() => setIsDifficultyOpen(false)}
      />
    )}
  </div>

  <div className="timing-menu__wrapper" style={{ marginLeft: "10px" }}>
    <button
      className="time-btn"
      disabled={testStarted}
      onClick={() => setIsTimeOpen((o) => !o)}
    >
      Timed {timeSetting}
    </button>
    {isTimeOpen && (
      <Menu
        options={timeOptions}
        onSelect={handleTimeSelect}
        onRequestClose={() => setIsTimeOpen(false)}
      />
    )}
  </div>
</div>


    </section>
  );
};

export default Timing;
