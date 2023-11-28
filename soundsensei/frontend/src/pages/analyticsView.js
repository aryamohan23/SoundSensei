
import '../css/analytics.css'; // Import the CSS for styling
import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../components/navbar";
import SliderColumn from '../components/slidercolumn';

const AnalyticsView = () => {
    const location = useLocation();
    const [images, setImages] = useState(location.state.images);
    const [audioFeatures, setAudioFeatures] = useState(location.state.audioFeatures)
    const navigate = useNavigate();


    const handleSliderChange = (label) => (event) => {
        console.log(event);
        setAudioFeatures(prevFeatures => ({
            ...prevFeatures,
            [label]: event.target.value
        }));
    };
    const getRecommendations = async() => {
        let response = await axios.get(`http://localhost:3000/playlist/recommend`);
        console.log(response);
        navigate('/recommend', { state: { songs: response.data.recommendations} });
    }

    return (
        <div className={"flex flex-col"}>
            <NavBar/>
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
                <div className={"py-1.5 px-3 cursor-pointer bg-white text-black rounded-full"} id ={"recommend-songs-btn"} onClick={() => {getRecommendations()}}> 
                            Recommend Songs
                </div>
            </div>
        </div>

    );
};

export default AnalyticsView;