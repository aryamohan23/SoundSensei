import React, { useState } from 'react';
import Slider from './slider';
import '../css/slider.css'

const SliderColumn = ({audioFeatures, handleSliderChange}) => {
  return (
    <div className="slider-column">
      {Object.keys(audioFeatures).map((label, index) => (
        <Slider key={index} label = {label} value={audioFeatures[label]} onChange={handleSliderChange(label)} />
      ))}
    </div>
  );
};

export default SliderColumn;