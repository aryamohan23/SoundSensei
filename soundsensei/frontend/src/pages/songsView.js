import Logo from '../components/logo'
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../components/loader';
import '../css/songview.css';
import axios from 'axios';
import {BgLeft} from "../components/svg";
import '../css/home.css';

const SongsView = () => {

    const location = useLocation();
    const [songs, setSongs] = useState([]);
    const [playlist, setPlaylist] = useState(location.state.selectedPlaylist || null);
    const [analyzingPlaylist, setAnalyzingPlaylist] = useState(false);
    const navigate = useNavigate();

    // useEffect to call getPlaylist when the playlists array is empty
    const getSongs = async (playlist) => {
        let playlistUri = playlist["uri"]
        let encodedUri = encodeURIComponent(playlistUri)
        let response = await axios.get(`http://localhost:3000/songs?playlist_uri=${encodedUri}&limit=50&offset=0`);
        console.log(response);
        if(response && response.data && response.data.songs){
            setSongs(response.data.songs)
        }

    }
    const analyzePlaylist = async () => {
        setAnalyzingPlaylist(true);
        let playlistUri = playlist["uri"]
        let encodedUri = encodeURIComponent(playlistUri)
        let response = await axios.get(`http://localhost:3000/playlist/analyze?playlist_uri=${encodedUri}`);
        console.log(response)
        setAnalyzingPlaylist(false);
        navigate('/analytics', { state: { images: response.data.analysis_images, audioFeatures: response.data.audio_feature_means} });
        // if(response && response.data && response.data.songs){
        //     setSongs(response.data.songs)
        // }

    }


    useEffect(() => {
        console.log(location);
        if ( playlist ) {
            getSongs(playlist);
        }
    }, [playlist]); 


    
    if (songs.length === 0) {
        return <div>Loading songs...</div>;
    }
    else{
        return (
            <div className={"flex flex-col wrapper"}>
                <LoadingModal showModal = {analyzingPlaylist}/>
                <Logo></Logo>
                <div className={"flex flex-col items-center text-white my-gap page-body content"}>
                    <div className={"px-10 list-header my-gap"}>
                        Your current songs:
                    </div>
                    <div className={"flex flex-col"} style={{width:"100%"}}>
                        {songs.map((song, i) => {
                            return (
                                <div key={song.track.id} className="song-item my-gap" >
                                    <div className={"list-num"} >
                                        {(i + 1).toString().padStart(2,'0')}
                                    </div>
                                    <div className={"list-name"} >
                                        {song.track.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={"py-1.5 px-3 cursor-pointer bg-white text-black rounded-full"} id ={"analyze-playlist-btn"} onClick = {analyzePlaylist}>
                        Analyze My Playlist
                    </div>
                </div>
                <div id = {"home-animation-top"}>
                        <BgLeft />
                    </div>
                    <div id = {"home-animation-bottom"}>
                        <BgLeft />
                    </div>
            </div>
            
        )
    }
   
        
}

export default SongsView;