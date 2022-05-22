// get access token from local storagr
// get user basic information  from the spotify api using axios
// show a loading screen until the user data is loaded
// show the user data
// show the user's profile picture if it exists
// or show defaultImage
import axios from 'axios' 
import React from 'react'
import Playlists from '../Playlists/Playlists'
import './Homepage.css'
import Profile from './Profile.jpg'
import '../Callback/Callback.css'
const Homepage = () => {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const token = localStorage.getItem('access_token')

    React.useEffect(() => {
        if (token) {
            axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                setUser(response.data)
                // Convert response.data to string and save it on local storage
                localStorage.setItem('user', JSON.stringify(response.data))
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
        }
    }, [token])

    if (loading) {
        return <div className='Callback'><div class="lds-dual-ring"></div></div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!user) {
        return <div>Not logged in</div>
    }

    return (
        <div className='Homepage'>
            <div className='Homepage-user'>
                <div className='Homepage-user-info'>
                    <img src={user.images.length ? user.images[0].url : Profile} className='ProfilePicture' alt='Profile' />
                    <h3 className='Homepage-user-name'>{user.display_name}</h3>
                    <small className='Homepage-user-followers'>{user.followers.total} followers</small>
                </div>
            </div>
            <Playlists />
        </div>

    )
}

export default Homepage;




// const Homepage = () => {
//     const defaultImage = {Profile}
//     localStorage.getItem('access_token');
//     const [user, setUser] = React.useState({})

//     React.useEffect(() => {
//         const getUser = async () => {
//             const token = localStorage.getItem('access_token');
//             const user = await axios.get('https://api.spotify.com/v1/me', {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             setUser(user.data)
//             console.log(user.data)
//         }
//         getUser()
//     }, [])

    

//     return (
//     <div>
        
//         <div className='Homepage'>
//             <div className='Homepage-header'>
//                 {/* if user.images.length = 0 image will have the defaultImage else if the user.images.length > 0*/}
//                 <img src={user.images.length < 0 ? defaultImage : user.images[0].url} alt='user' className='Homepage-image'/> 
//                 <h1>{user.display_name}</h1>
//                 <h2>{user.email}</h2>
//                 <h3>{user.country}</h3>
//             </div>




//             </div>

//     </div>
//   )
// }

// export default Homepage
