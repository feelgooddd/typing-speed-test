import Header from "./components/Header";
import Timing from "./components/Timing";
import TypingTest from "./components/TypingTest";
import { useState, useEffect } from "react";

const App = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const [timeSetting, setTimeSetting] = useState(60)
  const [difficulty, setDifficulty] = useState("medium");

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    if (!timerStarted) return; // start only on first keypress

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      <Header />
      <Timing
        time={formatTime(timeLeft)}
        testStarted={testStarted}
        wpm={wpm}
        accuracy={accuracy}
        timeLeft={timeLeft}
        timeSetting={formatTime(timeSetting)}
        setTimeLeft={setTimeLeft}
        setTimeSetting={setTimeSetting}
        setDifficulty={setDifficulty}
        difficulty={difficulty}
      />
      <TypingTest
        difficulty={difficulty}
        timeLeft={timeLeft}
        testStarted={testStarted}
        setTimerStarted={setTimerStarted}
        timerStarted={timerStarted}
        setTestStarted={setTestStarted}
        setWpm={setWpm}
        setAccuracy={setAccuracy}
      />
    </div>
  );
};

export default App;
