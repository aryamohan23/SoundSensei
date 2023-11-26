
import '../css/analytics.css'; // Import the CSS for styling
import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import SliderColumn from '../components/slidercolumn';

const AnalyticsView = () => {
    const location = useLocation();
    const [images, setImages] = useState(location.state.images);
    const [audioFeatures, setAudioFeatures] = useState(location.state.audioFeatures)

    const handleSliderChange = (label) => (event) => {
        console.log(event);
        setAudioFeatures(prevFeatures => ({
            ...prevFeatures,
            [label]: event.target.value
        }));
    };

    return (
        <div className="plots-grid">
            <div className="plot">
                <h1>Arya Circle Plot</h1>
                <img src={images[0].url} alt="Plot 1" />
            </div>
            <div className="plot">
                <h1>Arya Box Plot</h1>
                <img src={images[1].url} alt="Plot 2" />
            </div>
            <div className="plot">
                <h1>Arya Bar Plot</h1>
                <img src={images[2].url} alt="Plot 3" />
            </div>
            <div className="plot">
                <h1>Arya Word Plot</h1>
                <img src={images[3].url} alt="Plot 4" />
            </div>

            <div className="plot">
                <h1>Arya Emotions Plot</h1>
                <img src={images[4].url} alt="Plot 4" />
            </div>
            <SliderColumn audioFeatures = {audioFeatures} handleSliderChange = {handleSliderChange} />
        </div>
    );
};

export default AnalyticsView;