import "./css/menu.css";

const Menu = ({ options, onSelect, onRequestClose }) => {
  return (
      <div className="timing-menu">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => {
              onSelect(opt.value);
              onRequestClose();
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
  );
};

export default Menu;
