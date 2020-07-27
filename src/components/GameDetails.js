import React, { useState, useEffect } from 'react';
import '../styles.scss';
import { useRouteMatch, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import CoverPanel from './CoverPanel';

export default function GameDetails({editMode}) {

    const [gameId, setGameId] = useState('');
    const [name, setName] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [devId, setDevId] = useState('');
    const [ios, setIos] = useState('');
    const [android, setAndroid] = useState('');
    const [other, setOther] = useState(false);
    const [description, setDescription] = useState(''); 
    const [coverUrl, setCoverUrl] = useState(''); 
    
    const [devs, setDevs] = useState([]);
    const [isFetchedDevData, setIsFetchDevData] = useState(false);
    // const [error, setError] = useState('');
    // const [backendRes, setBackendRes] = useState('');
    const [msg, setMsg] = useState('')
    const [msgClassName, setMsgClassName] = useState('')

    const match = useRouteMatch('/games/:gameId');
    const history = useHistory();

    useEffect(()=>{
        async function fetchDevData() {
            try {
                const rawRes = await fetch('https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/');
                // const rawRes = await fetch('http://localhost:3000/.netlify/functions/server/devs/');
                const data = await rawRes.json();
                setDevs(data.result);
                setIsFetchDevData(true);
            } catch(e) {
                console.log(e)
            }
        }
        fetchDevData();
    }, [])

    useEffect(()=>{
        async function fetchGameData() {
            try {
                const rawRes = await fetch(`https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/${match.params.gameId}`)
                // const rawRes = await fetch(`http://localhost:3000/.netlify/functions/server/games/${match.params.gameId}`)
                const data = await rawRes.json();

                setGameId(data.result.gameId);
                setName(data.result.name);
                setReleaseYear(data.result.releaseYear);
                setDevId(data.result.devId);
                setIos(data.result.ios);
                setAndroid(data.result.android);
                setOther(data.result.other);
                setDescription(data.result.description);
                setCoverUrl(data.result.coverUrl);

                showApiRes(data.message)

            } catch(e) {
                 console.log(e)
            }
        }
        if (editMode) {
            fetchGameData();
            showRequest('Fetching data')
        }
    }, [isFetchedDevData])

    function showApiRes(_message) {
        setMsg(_message);
        setMsgClassName('api-res')
    }

    function showError(_message) {
        setMsg(_message);
        setMsgClassName('error')
    }

    function showRequest(_message) {
        setMsg(_message);
        setMsgClassName('')
    }

    async function handleDeletion() {
        if (window.confirm('Are you sure you wish to delete this document?')) {
            try {
                const rawRes = await fetch(
                    `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/${match.params.gameId}`, {
                // const rawRes = await fetch(
                    // `http://localhost:3000/.netlify/functions/server/devs/${match.params.gameId}`, {
                        method: 'DELETE',
                        headers: {'Content-type': 'application/json'}
                    }
                )
                const data = await rawRes.json();
                showApiRes(`${data.message}; ${data.result.deletedCount} document has been deleted.`);
            } catch(e) {
                console.log(e);
            }   
        }
    }

    async function handleSubmission() {

        setMsg('');
        if (gameId === '') {
            showError('gameId is required.')
            return;
        }
        if (gameId.toLowerCase() === 'new') {
            showError('gameId as "new" is specifically not allowed.')
            return;
        }
        if (name === '') {
            showError('name is required.')
            return;
        }
        if (releaseYear === '') {
            showError('releaseYear is required.')
            return;
        }
        if (2100 < releaseYear || releaseYear < 2000) {
            showError('Please enter a valid releaseYear')
            return;
        }

        let bodyContent = {
            gameId,
            name,
            releaseYear,
            devId,
            ios,
            android,
            other,
            description,
        }

        // console.log(match.params.gameId.trim())
        // console.log(gameId + ' === ' + match.params.gameId.trim() + ' is ' + (gameId === match.params.gameId.trim()) )
        if (editMode && gameId === match.params.gameId.trim()) {
            delete bodyContent.gameId;
            // console.log('Removed gameId from request bodyContent')
        }

        const _url = (editMode)
            ? `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/${match.params.gameId}`
            : `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/`;
        // const _url = (editMode)
        //     ? `http://localhost:3000/.netlify/functions/server/games/${match.params.gameId}`
        //     : `http://localhost:3000/.netlify/functions/server/games/`;
        const _method = (editMode) ? 'PATCH' : 'POST';

        showRequest('Performing ' + _method)
        try {
            const rawRes = await fetch(_url,{
                    method: _method,
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(bodyContent)
                }
            );
            const data = await rawRes.json();
            console.log(data);
            if (editMode) {
                // console.log(`${data.message}; ${data.result.nModified} document has been updated.`)
                // setMsg(`${data.message}; ${data.result.nModified} document has been updated.`)
                // showApiRes(data.message + "; " + data.result.nModified + "document has been updated.");
                showApiRes(`${data.message}; ${data.result.nModified} document has been updated.`)
            } else {
                console.log(data)
                showApiRes(`${data.message}; ${data.result.name} (${data.result.gameId}) has been created.`)
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="detail-panel">

            <div className="detail-panel-col-lt">

                <div className="detail-panel-item">
                    <label >
                        <p><span className="code"><strong>gameId</strong></span> (String, required): The unique identifier for the game. Generally not displayed to user. Only alphanumerics are recommended. Can be edited, but must always be unique. <span className="code">"new"</span> is specifically not allowed.</p>
                        <input type="text" value={gameId} onChange={(e)=>setGameId(e.target.value)} />
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>name</strong></span> (String, required): The formally capitalised and stylised name of the game.</p>
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>releaseYear</strong></span> (String, required): The year the game was released. Number of four digits only. Accepts only within the range of 2000-2100.</p>
                        <input type="number" value={releaseYear} onChange={(e)=>{setReleaseYear(e.target.value)}} maxLength={4} />
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>devId</strong></span> (String, required): The <span className="code">devId</span> identifier of the developer of the game. It is recommended that the developer document is created prior to the creation of the game document. Alternatively, you may use a placeholder, but do remember to update this afterwards.</p>
                        <p>It also should be noted that the options in this particular panel are automatically transcribed to the developers' full names.</p>
                        <select value={devId} onChange={(e)=>{setDevId(e.target.value)}} >
                            {(isFetchedDevData) ? <DevsOptions devs={devs}/> : ''}
                        </select>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>iOS</strong></span> (String): The URL to the iOS App Store release of the game, if available. Enter <span className="code">delisted</span> for delisted releases.</p>
                        <input type="text" value={ios} onChange={(e)=>{setIos(e.target.value)}} />
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>android</strong></span> (String): The URL to the Android Play Store release of the game, if available. Enter <span className="code">delisted</span> for delisted release.</p>
                        <input type="text" value={android} onChange={(e)=>{setAndroid(e.target.value)}} />
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>other</strong></span> (String): Whether an alternative release exists for the game (e.g. Humble Store, itch.io, web). Should this field be "yes", more information should be provided in the game's description.</p>
                        <select value={other} onChange={(e)=>{setOther(e.target.value)}} >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>description</strong></span> (String): A moderate-length description of the game by the editor. Use markdown. Also do take note that the input box can be resized for your convenience. The preview text will be shown below.</p>
                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="This box can be resized."/>
                    </label>
                    <div><ReactMarkdown source={description}/></div>
                </div>

            </div>
            <div className="detail-panel-col-rt">

                <div className={"detail-panel-col-rt-buttons"}>
                    <p className={msgClassName}>{msg}</p>
                    <button className="detail-button" onClick={handleSubmission}>{(editMode) ? "Save" : "Create"}</button>
                    <button className="detail-button" onClick={history.goBack}>Back</button>
                    {(editMode)
                        ? <button className="detail-button delete-button" onClick={handleDeletion}>Delete</button>
                        : ''}
                </div>

                {(editMode)
                    ? <CoverPanel passedCoverUrl={coverUrl} />
                    : ''}

            </div>
        </div>
    )
}

function DevsOptions({devs}) {
    return (devs.map((dev, index) => (<option key={devs.devId || index} value={dev.devId}>{dev.name}</option>)))
}