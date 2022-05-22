        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                
            }
        })

            .then(res => {
                console.log(res.data)
                setUser({
                    name: res.data.display_name,
                    email: res.data.email,
                    country: res.data.country,
                    id: res.data.id
                })
                if (res.data.images.length === 0) {
                // change image to default image
                    setUser({
                        ...user,
                        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png'
                    })
                }
            })
    }, [])