import "./css/typingtest.css";
import TypingTestOverlay from "./TypingTestOverlay";
import TypingInput from "./TypingInput";
import { useState, useRef, useEffect } from "react";

const TypingTest = ({
  setPB,
  setWpm,
  testStarted,
  setTestStarted,
  setAccuracy,
  setTimerStarted,
  timerStarted,
  timeLeft,
  difficulty,
  setTotalChars,
  setCorrectChars,
  mode,
  setTestFinished
}) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [text, setText] = useState("Test");
  const [data, setData] = useState({});
  const [charsTyped, setCharsTyped] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  const inputRef = useRef(null);
  const textTrackRef = useRef(null);
  const activeCharRef = useRef(null);

  const LINE_HEIGHT = 32; // matches line-height: 2rem

  const isTypingEnabled = testStarted && (timeLeft > 0 || mode === "untimed");

  // Keep input focused
  useEffect(() => {
    const keepFocus = () => {
      inputRef.current?.focus();
    };

    window.addEventListener("click", keepFocus);
    window.addEventListener("keydown", keepFocus);

    return () => {
      window.removeEventListener("click", keepFocus);
      window.removeEventListener("keydown", keepFocus);
    };
  }, []);

  // Fetch text data
  useEffect(() => {
    const getTextData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getTextData();
  }, []);

  useEffect(() => {
    const list = data[difficulty];
    if (Array.isArray(list) && list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setText(list[randomIndex].text);
    }
  }, [data, difficulty]);

  // scroll control
  useEffect(() => {
    if (!activeCharRef.current || !textTrackRef.current) return;

    const charTop = activeCharRef.current.offsetTop;

    setScrollOffset((prev) => {
      // scroll when caret passes approx 3 lines
      if (charTop - prev > LINE_HEIGHT * 3) {
        return prev + LINE_HEIGHT;
      }
      return prev;
    });
  }, [input.length]);

function handleType(value) {
  // Prevent typing past text length
  if (value.length > text.length) return;

  // Block typing only if timed and timeLeft is 0
  if (timeLeft === 0 && mode !== "untimed") return;

  // Start time and timer on first character typed
  if (!startTime && value.length === 1) setStartTime(Date.now());
  if (!timerStarted && value.length === 1) setTimerStarted(true);

  // Count new characters typed
  if (value.length > input.length) setCharsTyped(prev => prev + (value.length - input.length));

  // Update input state
  setInput(value);

  // Calculate WPM
  const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
  if (elapsedMinutes > 0) setWpm(Math.round(charsTyped / 5 / elapsedMinutes));

  // Calculate correct chars and accuracy
  const correctChars = value
    .split("")
    .filter((char, i) => char === text[i]).length;
  const totalChars = value.length;

  setAccuracy(totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100));
  setCorrectChars(correctChars);
  setTotalChars(totalChars);

  // Only extend text if in timed mode
  if (mode !== "untimed") {
    const remainingChars = text.length - value.length;
    const list = data[difficulty];
    if (Array.isArray(list) && list.length > 0 && remainingChars <= 150) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setText(prev => prev + " " + list[randomIndex].text);
    }
  }

  // Finish test if untimed and user typed all available text
  if (mode === "untimed" && value.length === text.length) {
    setTestFinished(true);
  }
}



  function handleClick() {
    setTestStarted(true);
    inputRef.current?.focus();
  }

  return (
    <section
      className="typing-section"
      onClick={() => inputRef.current?.focus()}
    >
      {!testStarted && <TypingTestOverlay startTest={handleClick} />}

      <p
        className="typing-text"
        ref={textTrackRef}
        style={{ transform: `translateY(-${scrollOffset}px)` }}
      >
        {(typeof text === "string" ? text : "Loading...")
          .split("")
          .map((char, index) => {
            let className = "";

            if (index < input.length) {
              className = char === input[index] ? "correct" : "incorrect";
            }

            if (index === input.length) className += " active";

            return (
              <span
                key={index}
                className={className}
                ref={index === input.length ? activeCharRef : null}
              >
                {char}
              </span>
            );
          })}
      </p>

      <TypingInput
        running={isTypingEnabled}
        value={input}
        onType={handleType}
        ref={inputRef}
      />
    </section>
  );
};

export default TypingTest;
