import Logo from '../components/logo'
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../components/loader';
import '../css/songview.css';
import axios from 'axios';

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
            <div className={"flex flex-col"}>
                <LoadingModal showModal = {analyzingPlaylist}/>
                <Logo></Logo>
                <div className={"flex flex-col text-white gap-5 page-body"}>
                    <div className={"px-10 list-header"}>
                        Your current songs
                    </div>
                    <div className={"flex flex-col gap-3"}>
                        {songs.map((song, i) => {
                            return (
                                <div key={i} className={"cursor-pointer px-10 text-white flex flex-row gap-2 h-full items-center hover:text-black hover:bg-gradient-to-r from-white to-transparent list-element"}>
                                    <div className={"text-4xl list-num"} >
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
            </div>
        )
    }
   
        
}

export default SongsView;