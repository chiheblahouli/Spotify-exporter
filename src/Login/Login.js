// Using the spotify Api to get the user's data
// https://developer.spotify.com/documentation/web-api/reference/
// Save the access token to local storage
// Client ID a724daf951794ec2bfef5d65d2ec9a34
// Client Secret 4cd0a180ae0040a2931c8d3d321dc5bb
// Redirects to /Homepage

import React from 'react'
import './Login.css'


const Login = () => {

    return (
    <div className='Login'>
        {/* Login button redirect to App */}
        <label htmlFor='login'>Login with your Spotify account</label>
        <button id='login' className='LoginBtn' onClick={() => {
            window.location.href = 'https://accounts.spotify.com/authorize?client_id=a724daf951794ec2bfef5d65d2ec9a34&client_secret=4cd0a180ae0040a2931c8d3d321dc5bb&redirect_uri=http://localhost:3000/callback&response_type=token&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative'
        }
        }>Login</button>

    </div>
  )
}

export default Login
