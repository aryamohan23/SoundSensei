import { useState } from 'react';

function Slider ({ value, label, onChange }){
    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => {
      setHover(true);
    };
  
    const handleMouseLeave = () => {
      setHover(false);
    };
    return (
    <div className="slider-container">
      <div className="slider-label-container">
          <label>{label}</label>
      </div>
      <div className='slider-wrapper'onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        { hover &&<div>Value: {value}</div>}
        <input className = "slider" type="range" min="-1" max="1" step="0.01" value={value} onChange={onChange} />
      </div>

    </div>
  )
};

export default Slider;