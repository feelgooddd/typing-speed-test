import Header from "./components/Header";
import Results from "./components/Results";
import Timing from "./components/Timing";
import TypingTest from "./components/TypingTest";
import { useState, useEffect } from "react";

const App = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);

  const [timeSetting, setTimeSetting] = useState(60);
  const [difficulty, setDifficulty] = useState("medium");

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(60);
  const [PB, setPB] = useState(localStorage.getItem("PB") || 0);

  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [charsMissed, setCharsMissed] = useState(0);
  const [resultVariant, setResultVariant] = useState("");
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
  const handleReset = () => {
    setTestStarted(false);
    setTestFinished(false);
    setTimerStarted(false);
    setDifficulty("medium");
    setTimeSetting(60);
    setTimeLeft(60)
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);
    setCharsMissed(0);
    setResultVariant("");
  };
  useEffect(() => {
    if (timeLeft === 0 && PB === 0) {
      setResultVariant("firstpb");
      setCharsMissed(totalChars - correctChars);
      setTestFinished(!testFinished);
    } else if (timeLeft === 0 && wpm > PB) {
      setResultVariant("newpb");
      setCharsMissed(totalChars - correctChars);
      setTestFinished(!testFinished);
    } else if (timeLeft === 0 && wpm < PB) {
      setResultVariant("nopb");
      setCharsMissed(totalChars - correctChars);
      setTestFinished(!testFinished);
    }
    if (timeLeft === 0 && wpm > PB) {
      //Update visually without needing a reload
      setPB(wpm);
      //Store it in local storage
      localStorage.setItem("PB", wpm);
    }
  }, [timeLeft]);

  return (
    <div>
      <Header testStarted={testStarted} PB={PB} handleReset={handleReset} />

      {!testFinished ? (
        <>
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
            setPB={setPB}
            setCorrectChars={setCorrectChars}
            setTotalChars={setTotalChars}
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
