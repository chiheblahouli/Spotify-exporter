// callback URL: http://localhost:3000/callback
// save the access token from url to localstorage
// https://developer.spotify.com/documentation/web-api/reference/

import React from 'react'
import './Callback.css'
const Callback = () => {
    localStorage.setItem('access_token', window.location.href.split('#')[1].split('&')[0].split('=')[1])
    window.location.href = '/homepage'

    return (
        <div className='Callback'>
            <div class="lds-dual-ring"></div>
        </div>
    )
}

export default Callback



// return (
//     <div className='Playlists'>
//         <div className='Playlists-header'>
//             <h1>Playlists</h1>
//         </div>
//         <div className='Playlists-list'>
//             {playlists.map(playlist => (
//                 <div className='Playlists-list-item' key={playlist.id}>
//                     <div className='Playlists-list-item-image'>
//                         <img src={playlist.images[0].url} alt='Playlist' className='item-image' />
//                     </div>
//                     <div className='Playlists-list-item-info'>
//                         <div className='Playlists-list-item-name'>{playlist.name}</div>
//                         <div className='Playlists-list-item-tracks'>{playlist.tracks.total} tracks</div>

//                         <button key={playlist.id} onClick={() => (exportPlaylist(playlist))} >Export</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
// )