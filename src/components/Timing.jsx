import "./css/timing.css"
const Timing = ({wpm, accuracy, testStarted, time}) => {
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
        <button className="difficulty-btn">
            Hard
        </button>
        <button className="time-btn">
            Timed (60s)
        </button>
      </div>
    </section>
  )
}

export default Timing
