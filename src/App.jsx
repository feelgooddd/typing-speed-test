import Header from "./components/Header";
import Results from "./components/Results";
import Timing from "./components/Timing";
import TypingTest from "./components/TypingTest";
import { useState, useEffect } from "react";

const App = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  const [mode, setMode] = useState("timed"); // "timed" or "untimed"
  const [timeSetting, setTimeSetting] = useState(60);
  const [difficulty, setDifficulty] = useState("medium");

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [PB, setPB] = useState(Number(localStorage.getItem("PB")) || 0);

  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [charsMissed, setCharsMissed] = useState(0);
  const [resultVariant, setResultVariant] = useState("");

  const [testKey, setTestKey] = useState(0);
  const [handledFinish, setHandledFinish] = useState(false);

  // Timer logic
useEffect(() => {
  if (!timerStarted || testFinished) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (mode === "timed") {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      } else {
        return prev + 1;
      }
    });
  }, 1000);

  return () => clearInterval(interval);
}, [timerStarted, mode, testFinished]);

  
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  const handleReset = () => {
    setTestStarted(false);
    setTestFinished(false);
    setTimerStarted(false);
    setHandledFinish(false);
    setDifficulty("medium");

    if (mode === "untimed") {
      setTimeSetting(0);
      setTimeLeft(0);
    } else {
      setTimeSetting(60);
      setTimeLeft(60);
    }

    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setCharsMissed(0);
    setResultVariant("");
    setTestKey((prev) => prev + 1); // remount TypingTest
  };

  // Finish test logic (runs only once per test)
useEffect(() => {
  // Only run when the test actually finishes
  if (handledFinish) return;
console.log(handledFinish)
  const testShouldFinish =
    (mode === "timed" && timeLeft === 0) ||
    (mode === "untimed" && testFinished);

  if (!testShouldFinish) return;

  // Everything here runs **once**
  const missed = totalChars - correctChars;
  setCharsMissed(missed);

  let variant = "nopb";
  if (PB === 0) variant = "firstpb";
  else if (wpm > PB) variant = "newpb";
  setResultVariant(variant);

  if (wpm > PB) {
    setPB(wpm);
    localStorage.setItem("PB", wpm);
  }

  setHandledFinish(true); // mark done
}, [timeLeft, testFinished, handledFinish, mode]); // Only minimal deps

  return (
    <div>
      <Header
        setPB={setPB}
        testStarted={testStarted}
        PB={PB}
        handleReset={handleReset}
      />

      {!handledFinish ? (
        <>
          <Timing
            time={formatTime(timeLeft)}
            testStarted={testStarted}
            wpm={wpm}
            accuracy={accuracy}
            timeLeft={timeLeft}
            timeSetting={timeSetting}
            setTimeLeft={setTimeLeft}
            setTimeSetting={setTimeSetting}
            setDifficulty={setDifficulty}
            difficulty={difficulty}
            mode={mode}
            setMode={setMode}
          />
          <TypingTest
            key={testKey}
            difficulty={difficulty}
            timeLeft={timeLeft}
            testStarted={testStarted}
            setTimerStarted={setTimerStarted}
            timerStarted={timerStarted}
            setTestStarted={setTestStarted}
            setWpm={setWpm}
            setAccuracy={setAccuracy}
            setPB={setPB}
            setCorrectChars={setCorrectChars}
            setTotalChars={setTotalChars}
            mode={mode}
            setTestFinished={setTestFinished}
          />
        </>
      ) : (
        <Results
          wpm={wpm}
          accuracy={accuracy}
          charsHit={correctChars}
          charsMissed={charsMissed}
          resultVariant={resultVariant}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

export default App;
