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
  setTestFinished,
}) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [text, setText] = useState("Loading...");
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
    const keepFocus = () => inputRef.current?.focus();
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

  // Pick random text based on difficulty
  useEffect(() => {
    const list = data[difficulty];
    if (Array.isArray(list) && list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setText(list[randomIndex].text);
    }
  }, [data, difficulty]);

  // Scroll control
  useEffect(() => {
    if (!activeCharRef.current || !textTrackRef.current) return;
    const charTop = activeCharRef.current.offsetTop;

    setScrollOffset((prev) => {
      if (charTop - prev > LINE_HEIGHT * 3) return prev + LINE_HEIGHT;
      return prev;
    });
  }, [input.length]);

  const handleType = (value) => {
    if (value.length > text.length) return;
    if (timeLeft === 0 && mode !== "untimed") return;

    // Start timer on first char
    if (!startTime && value.length === 1) setStartTime(Date.now());
    if (!timerStarted && value.length === 1) setTimerStarted(true);

    // Track chars typed
    if (value.length > input.length)
      setCharsTyped((prev) => prev + (value.length - input.length));

    setInput(value);

    // WPM & accuracy
    const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
    if (elapsedMinutes > 0) setWpm(Math.round(charsTyped / 5 / elapsedMinutes));

    const correctCount = value
      .split("")
      .filter((char, i) => char === text[i]).length;
    setCorrectChars(correctCount);
    setTotalChars(value.length);

    setAccuracy(
      value.length === 0 ? 100 : Math.round((correctCount / value.length) * 100)
    );

    // Extend text only for timed
    if (mode !== "untimed") {
      const remainingChars = text.length - value.length;
      const list = data[difficulty];
      if (Array.isArray(list) && list.length > 0 && remainingChars <= 150) {
        const randomIndex = Math.floor(Math.random() * list.length);
        setText((prev) => prev + " " + list[randomIndex].text);
      }
    }

    // Finish test for untimed when user completes text
    if (mode === "untimed" && value.length === text.length) {
      setTestFinished(true);
    }
  };

  const handleClick = () => {
    setTestStarted(true);
    inputRef.current?.focus();
  };

  return (
    <section className="typing-section" onClick={() => inputRef.current?.focus()}>
      {!testStarted && <TypingTestOverlay startTest={handleClick} />}

      <p
        className="typing-text"
        ref={textTrackRef}
        style={{ transform: `translateY(-${scrollOffset}px)` }}
      >
        {text.split("").map((char, index) => {
          let className = "";
          if (index < input.length) className = char === input[index] ? "correct" : "incorrect";
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

      <TypingInput running={isTypingEnabled} value={input} onType={handleType} ref={inputRef} />
    </section>
  );
};

export default TypingTest;
