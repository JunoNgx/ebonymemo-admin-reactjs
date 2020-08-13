import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function CoverPanel({ passedCoverUrl }) {
    const [coverUrl, setCoverUrl] = useState('')
    const [image, setImage] = useState('')
    const [msg, setMsg] = useState('')

    const match = useRouteMatch('/games/:gameId');
    const auth = useContext(AuthContext);

    useEffect(()=>{
        setCoverUrl(passedCoverUrl);
    },[passedCoverUrl])

    // useEffect(()=>{

    // }, [coverUrl])

    function handleFileChange(e) {
        setImage(e.target.files[0])
        setMsg('')
        // console.log(image)
    }

    async function submitCover() {
        setMsg('')
        if (!auth.isAuthenticated) {
            setMsg('Login is required for data alteration')
            return;
        }
        if (image === '' || image === undefined) {
            setMsg('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('cover', image, image.name);
        try {
            setMsg('Uploading ....')
            const rawRes = await fetch(
                // `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/${match.params.gameId.trim()}/cover`,
                `${process.env.REACT_APP_API_URL}/games/${match.params.gameId.trim()}/cover`,
                // `http://localhost:3000/.netlify/functions/server/games/${match.params.gameId.trim()}/cover`,
                {
                    method: 'POST',
                    // headers: {'Content-Type': 'multipart/form-data'},
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`
                    },
                    body: formData
                }
            );
            const data = await rawRes.json();
            console.log(data);
            setMsg(data.message)
            setCoverUrl(data.url)

        } catch(e) {
            console.log(e)
            setMsg(e)
        }
    }

    return (
        <div className={'cover-panel'}>
            <img className={"game-cover"} src={coverUrl} />
            <div className="detail-panel-item">
                <label>
                    <p><span className="code"><strong>coverUrl</strong></span> (String): The url to game cover image. This image is hosted externally and private on Google Cloud Storage. This client does not allow direct modification of the url string, but new a new image can be uploaded, which will also trigger the document update. Due to the limitations of the API, this portion is only accessible after the game document has been created. If you see a message telling you that the game cover has been updated successfully, you're good to go.</p>
                    {/* <input value={passedCoverUrl} onChange={(e) => { setCoverUrl(e.target.value) }} /> */}

                    <p>{msg}</p>
                    <input type="file" onChange={handleFileChange}/>
                    <button className="detail-button" onClick={submitCover}>Update Cover</button>
                </label>
            </div>
        </div>

    )
}
