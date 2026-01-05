import './css/timingmenu.css'

const TimingMenu = ({ type, onSelect, onClose }) => {
  const timeOptions = [
    { label: "0:30", value: 30 },
    { label: "1:00", value: 60 },
    { label: "1:30", value: 90 },
  ];

  const difficultyOptions = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  const options = type === "time" ? timeOptions : difficultyOptions;

  return (
    <div className="timing-menu">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => {
            onSelect(opt.value);
            onClose();
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default TimingMenu;
