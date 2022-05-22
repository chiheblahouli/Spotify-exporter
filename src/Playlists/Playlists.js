import React, { useState, useEffect } from 'react';
import './Playlists.css';
import { Link } from 'react-router-dom';
import axios from 'axios'


const Playlists = () => {

    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token');




    const exportPlaylist = (playlist) => {
        const playlistName = playlist.name;
        const playlistTracks = playlist.tracks.href;
        axios.get(playlistTracks, {
            headers: {
                'Authorization': 'Bearer ' + token
            }}).then(response => {
                        const tracks = response.data.items;
                        const trackList = tracks.map(track => {
                            return {
                                name: track.track.name,
                                artist: track.track.artists[0].name,
                                album: track.track.album.name,
                                preview: track.track.preview_url,
                                duration: track.track.duration_ms
                            }
                        })
                        const playlistData = {
                            name: playlistName,
                            tracks: trackList
                        }
                        console.log(playlistData)
                        const playlistJSON = JSON.stringify(playlistData)
                        const blob = new Blob([playlistJSON], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', playlistName + '.json');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                )
    }



    useEffect(() => {
        if (token) {
            axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                setPlaylists(response.data.items);
                console.log(response.data.items)
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        }
    }
    , [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!playlists && !token) {
        return <div>Not logged in</div>
    }

    // Create a card shaped div for each playlist
    // Inline Style for each card 
    
    return (
        <div className='Playlists'>
            {playlists.map(playlist => {
                return (
                    <div  style={{backgroundImage: `url(${playlist.images.length ? playlist.images[0].url : ''})`}} className='Playlist' key={playlist.id}>
                        <div className='Playlist-info'>
                            <h3>{playlist.name}</h3>
                            <p>{playlist.owner.display_name}</p>
                            <p>{playlist.tracks.total} tracks</p>
                            <button onClick={() => exportPlaylist(playlist)}>Export</button>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Playlists;