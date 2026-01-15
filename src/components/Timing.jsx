import "./css/timing.css";
import { useState, useEffect } from "react";
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
  mode,
  setMode, // <-- make sure you pass setMode from App.jsx
}) => {
  // Time and difficulty options
  const timeOptions = [
    { label: "0:01", value: 1 },
    { label: "0:30", value: 30 },
    { label: "1:00", value: 60 },
    { label: "1:30", value: 90 },
    { label: "Untimed", value: 0 },
  ];

  const difficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  // Local state
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 725);

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 725);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle selecting a time option
  const handleTimeSelect = (value) => {
    if (testStarted) return;

    if (value === 0) {
      // Untimed
      setMode("untimed");
      setTimeSetting(0); // keep as number 0
      setTimeLeft(0);
    } else {
      // Timed
      setMode("timed");
      setTimeSetting(value); // keep as number
      setTimeLeft(value);
    }
  };

  // Handle selecting difficulty
  const handleDifficultySelect = (level) => {
    if (testStarted) return;
    setDifficulty(level);
  };

  return (
    <section className="timing-section">
      {/* Stats */}
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

      {/* Buttons */}
      <div className="timing-section__buttons">
        {/* Difficulty Selector */}
        <div className="timing-menu__wrapper">
          {isDesktop ? (
            <div className="desktop-options-wrapper">
              <span className="desktop-label">Difficulty:</span>
              <div className="desktop-options">
                {difficultyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    disabled={testStarted}
                    className={difficulty === opt.value ? "active" : ""}
                    onClick={() => handleDifficultySelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <button
                className="default-btn difficulty-btn"
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
            </>
          )}
        </div>

        {/* Time Selector */}
        <div className="timing-menu__wrapper">
          {isDesktop ? (
            <div className="desktop-options-wrapper">
              <span className="desktop-label">Time:</span>
              <div className="desktop-options">
                {timeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    disabled={testStarted}
                    className={
                      (opt.value === 0 && mode === "untimed") ||
                      (opt.value !== 0 && timeSetting === opt.value)
                        ? "active"
                        : ""
                    }
                    onClick={() => handleTimeSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <button
                className="time-btn default-btn"
                disabled={testStarted}
                onClick={() => setIsTimeOpen((o) => !o)}
              >
                {mode === "timed"
                  ? `Timed ${timeSetting}`
                  : "Untimed"}
              </button>
              {isTimeOpen && (
                <Menu
                  options={timeOptions}
                  onSelect={handleTimeSelect}
                  onRequestClose={() => setIsTimeOpen(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Timing;
