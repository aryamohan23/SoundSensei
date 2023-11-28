import React from 'react';
import NavBar from "../components/navbar";
import { BgLeft } from "../components/svg";
import '../css/home.css';

const About = () => {
    return (
        <div className={"flex flex-col"}>
            <NavBar />
            <div className={"flex flex-col items-center text-white my-gap page-body content"} style={{fontFamily: 'Lexend Peta'}}>
                <div className={"px-10 my-gap"}>
                    <h1 className={"text-3xl font-bold mb-4"}>About SoundSensei</h1>
                    <p>In the realm of music recommender systems, advanced technology and data analytics have spurred a transformative shift. This research delves into SoundSensei, a data-driven music recommendation system, aiming to uncover its profound implications and intricate technical foundations.</p>
                    <br></br>
                    <p>Driven by data analysis, music recommender systems play a pivotal role, serving over 35 billion hours of music globally on platforms like Spotify in 2020. SoundSensei operates within Spotify's dataset of 70 million tracks, using advanced machine learning and data analytics to craft recommendations that surpass personalization.</p>
                    <br></br>
                    <p>At its core, SoundSensei employs sophisticated data analysis techniques, from statistical modeling to precise methods, bridging the gap between chart-toppers and deeply personal musical choices. This project offers a comprehensive guide to the underlying algorithms and methodologies. Beyond personalization, SoundSensei excels in content safety, using NLP algorithms to curate kid-friendly music content, addressing digital-age challenges for parents.</p>
                </div>
            </div>
            <div id={"home-animation-top"}>
                <BgLeft />
            </div>
            <div id={"home-animation-bottom"}>
                <BgLeft />
            </div>
        </div>
    );
}

export default About;
