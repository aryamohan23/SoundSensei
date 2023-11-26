

import {findAllByDisplayValue} from "@testing-library/react";
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/logo';
import axios from 'axios';
import '../css/songview.css';
import {BgLeft} from "../components/svg";
import '../css/home.css';

const PlaylistsView = ({setAuthUrl}) => {

    const [playlist, setPlaylist] = useState([]);

    const navigate = useNavigate();

    // useEffect to call getPlaylist when the playlists array is empty
    const getPlaylist = async () => {
        let response = await axios.get('http://localhost:3000/playlist')
        if(response && response.data && response.data.playlists){
            setPlaylist(response.data.playlists)
            // setCurrentPlaylist(response.data.playlists);
            setAuthUrl(null);
        }
        else
            setAuthUrl(response.data.oauth_url)
        
    }

    const handlePlaylistClick = (selectedPlaylist) => {
        // Assuming setCurrentPlaylist is a function passed from the parent component to set the current playlist
        navigate('/songs', { state: { selectedPlaylist } });
    };

    useEffect(() => {
        if (playlist.length === 0) {
            getPlaylist();
        }
    }, [playlist]); // Dependencies array

    // Conditional rendering based on the playlists length
    if (playlist.length === 0) {
        return <div>Loading playlists...</div>;
    } else {
        return (
            <div className={"flex flex-col"}>
                <Logo/>
                <div className={"flex flex-col items-center text-white my-gap page-body content"}>
                    <div className={"px-10 list-header my-gap"}>
                        Select a playlist to analyze:
                    </div>
                    <div className={"flex flex-col my-gap"} style={{width:"100%"}}>
                        {playlist.map((playlistItem, i) => (
                            <div key={i} className="song-item my-gap" onClick={() => handlePlaylistClick(playlistItem)} >
                                <div className={"list-num"}>
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>
                                <div className={"list-name"}>
                                    {playlistItem.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div id = {"home-animation-top"}>
                        <BgLeft />
                    </div>
                    <div id = {"home-animation-bottom"}>
                        <BgLeft />
                    </div>
            </div>
        );
    }
}

export default PlaylistsView;
