const Slider = ({ value, label, onChange }) => (
    <div className="slider-container">
    <div className="slider-label-container">
        <label>{label}</label>
    </div>
    <input className = "slider" type="range" min="-1" max="1" step="0.01" value={value} onChange={onChange} />
  </div>
);

export default Slider;