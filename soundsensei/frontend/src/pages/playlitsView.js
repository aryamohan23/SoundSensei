

import {findAllByDisplayValue} from "@testing-library/react";
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/logo';
import axios from 'axios';
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
                <div className={"flex flex-col text-white gap-5 page-body"}>
                    <div className={"px-10 list-header"}>
                        Your current playlists
                    </div>
                    <div className={"flex flex-col gap-3"}>
                        {playlist.map((playlistItem, i) => (
                            <div key={i} className={"cursor-pointer px-10 text-white flex flex-row gap-2 h-full items-center hover:text-black hover:bg-gradient-to-r from-white to-transparent list-element"} onClick={() => handlePlaylistClick(playlistItem)}>
                                <div className={"text-4xl list-num"}>
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>
                                <div className={"list-name"}>
                                    {playlistItem.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaylistsView;
