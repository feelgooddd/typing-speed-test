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
}) => {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [text, setText] = useState("Test");
  const [data, setData] = useState({});
  const [charsTyped, setCharsTyped] = useState(0);
  // State boolean to monitor end of text
  // const [textAppendFlag, setTextAppendFlag] = useState(false);

  const inputRef = useRef(null);

  const isTypingEnabled = testStarted && !(timeLeft === 0);


    const contentRef = useRef(null);

  // Scroll to active character as user types
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const activeChar = container.querySelector(".active");
    if (activeChar) {
      // Scroll so the active character is visible
      activeChar.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [input]); // runs every time input changes

  // Focus input on mount and whenever test starts
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [testStarted]);

  // Keep input focused even if they click somewhere else
  useEffect(() => {
    const keepFocus = () => {
      if (inputRef.current) inputRef.current.focus();
    };

    window.addEventListener("click", keepFocus);
    window.addEventListener("keydown", keepFocus);

    return () => {
      window.removeEventListener("click", keepFocus);
      window.removeEventListener("keydown", keepFocus);
    };
  }, []);
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

  function handleType(value) {
    if (value.length > text.length) return;
    if (timeLeft === 0) {
      return;
    } // stop typing when time is up

    // Start time logic
    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }
    if (!timerStarted && value.length === 1) {
      setTimerStarted(true); // start timer now
    }
    if (value.length > input.length) {
      setCharsTyped((prev) => prev + (value.length - input.length));
    }

    setInput(value);

    //wpm calc
    const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;

    if (elapsedMinutes > 0) {
      const currentWpm = Math.round(charsTyped / 5 / elapsedMinutes);
      setWpm(currentWpm);
    }

    // Accuracy calc
    const correctChars = value
      .split("")
      .filter((char, i) => char === text[i]).length;
    const totalChars = value.length;
    setAccuracy(
      totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100)
    );

    setCorrectChars(correctChars);
    setTotalChars(totalChars);

    // ------------------------
    // Append new text if close to end
    const remainingChars = text.length - value.length;
    const list = data[difficulty];

    if (Array.isArray(list) && list.length > 0 && remainingChars <= 15) {
      const randomIndex = Math.floor(Math.random() * list.length);
      const nextText = list[randomIndex].text;
      setText((prev) => prev + " " + nextText); // add a space betwen the old text n the new txt
    }
  }

  function handleClick() {
    setTestStarted(true);

    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <section
      className="typing-section"
      onClick={() => inputRef.current?.focus()}
      style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}
    >
      {!testStarted && <TypingTestOverlay startTest={handleClick} />}

      <div
        ref={contentRef}
        className="typing-section__content"
        style={{ flex: 1, overflowY: "auto", padding: "1rem", paddingBottom: "3rem" }}
      >
        <p className="typing-text">
          {(typeof text === "string" ? text : "Loading...")
            .split("")
            .map((char, index) => {
              let className = "";
              if (index < input.length) className = char === input[index] ? "correct" : "incorrect";
              if (index === input.length) className += " active";
              return (
                <span key={index} className={className}>
                  {char}
                </span>
              );
            })}
        </p>
      </div>

      <TypingInput
        running={isTypingEnabled}
        value={input}
        onType={handleType}
        ref={inputRef}
        style={{ width: "100%", boxSizing: "border-box" }}
      />
    </section>
  );
};

export default TypingTest;
