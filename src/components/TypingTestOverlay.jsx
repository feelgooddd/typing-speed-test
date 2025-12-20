import "./css/typingtestoverlay.css"
const TypingTestOverlay = ({startTest}) => {
  return (
    <div onClick={startTest} className="typing-section__overlay">
      <button onClick={startTest} className="start-test-btn">Start Typing Test</button>
      <p>Or click the text and start typing</p>
    </div>
  );
};

export default TypingTestOverlay;
