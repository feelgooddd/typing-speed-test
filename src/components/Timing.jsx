import "./css/timing.css"
const Timing = () => {
  return (
    <section className="timing-section">
      <div className="timing-section__details">
        <div className="timing-section__details-WPM">
            <h3>WPM:</h3>
            <p>0</p>
        </div>
        <div className="timing-section__details-accuracy">
            <h3>Accuracy:</h3>
            <p>100%</p>
        </div>
        <div className="timing-section__details-time">
            <h3>Time:</h3>
            <p>0:60</p>
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
