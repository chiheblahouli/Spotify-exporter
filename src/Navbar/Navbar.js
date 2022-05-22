// Search bar, Quiries the spotify api to find the song, album, artist, playlist, and user
// after user insert to the search input the navbar shows a dropdown with all the results

import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useReducer } from 'react';
import axios from 'axios' 

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [type, setType] = useState('artist');
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    // get the user's data from local storage, convert it to json and save it to user
    const user = useMemo(() => {
        return JSON.parse(localStorage.getItem('user'));
    }, []);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);

    const tokenRef = useRef(token);
    tokenRef.current = token;
    
    const userRef = useRef(user);
    userRef.current = user;

    const loadingRef = useRef(loading);
    loadingRef.current = loading;

    const errorRef = useRef(error);
    errorRef.current = error;

    const userLoadingRef = useRef(loadingUser);
    userLoadingRef.current = loadingUser;

    const userErrorRef = useRef(errorUser);
    userErrorRef.current = errorUser;

    const searchReducer = useCallback((state, action) => {
        switch (action.type) {
            case 'SET_SEARCH':
                return {
                    ...state,
                    search: action.search
                };
            case 'SET_RESULTS':
                return {
                    ...state,
                    results: action.results
                };
            case 'SET_LOADING':
                return {
                    ...state,
                    loading: action.loading
                };
            case 'SET_ERROR':
                return {
                    ...state,
                    error: action.error
                };
            case 'SET_QUERY':
                return {
                    ...state,
                    query: action.query
                };
            case 'SET_TYPE':
                return {
                    ...state,
                    type: action.type
                };
            default:
                return state;
        }
    }, []);

    const [state, dispatch] = useReducer(searchReducer, {
    
        search: '',
        results: [],
        loading: false,
        error: null,
        query: '',
        type: 'artist'
    });

    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    useEffect(() => {
        userRef.current = user;
    }, [user]);
    
    useEffect(() => {
        loadingRef.current = loading;
    }, [loading]);

    useEffect(() => {
        errorRef.current = error;
    }, [error]);

    useEffect(() => {
        userLoadingRef.current = loadingUser;
    }, [loadingUser]);

    useEffect(() => {
        userErrorRef.current = errorUser;
    
    }, [errorUser]);



    useEffect(() => {
        if (query) {
            const url = `https://api.spotify.com/v1/${type}?q=${query}&type=${type}`;
            axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {    
                setResults(response.data.artists.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        }
    }, [query]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(search);
        setLoading(true);
        setError(null);
    }

    const handleType = (event) => {
        setType(event.target.value);
    }

    const handleClick = (event) => {
        setSearch('');
        setQuery('');
        setResults([]);
        setLoading(false);
        setError(null);
    }

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('access_token');
        setToken(null);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        window.location = 'http://localhost:3000/';
    }

    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(search);
        setLoading(true);
        setError(null);
    }

    return (
        <div className="Navbar">
            <input type="text" value={search} onChange={handleChange} placeholder="Search for an artist, album, playlist, or song..." />
            <button type="submit" onClick={handleSubmit}>Search</button>
       
            <div className="dropdown">
                <button className="dropbtn">{type}</button>
                <div className="dropdown-content">
                    <button onClick={handleType} value="artist">Artist</button>
                    <button onClick={handleType} value="album">Album</button>
                    <button onClick={handleType} value="playlist">Playlist</button>
                    <button onClick={handleType} value="track">Track</button>
                </div>
            </div>
            <button onClick={handleClick}>Clear</button>
            <div className="results">
                {
                    loading ? <p>Loading...</p> : null
                }
                {
                    error ? <p>{error.message}</p> : null
                }
                {
                    results.map(result => {
                        return (
                            <div key={result.id}>
                                <p>{result.name}</p>
                            </div>
                        )
                    })
                }
            </div>
            {
                token ? (
                    <div className="user">
                        {/* Check if image.length is not undefined */}
                        <p>{user.display_name}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="login">
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar;