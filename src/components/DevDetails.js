import React, { useState, useEffect, useContext } from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import '../styles.scss';
import { AuthContext } from './AuthContext';

export default function DevDetails({editMode}) {

    const [devId, setDevId] = useState('');
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [website, setWebsite] = useState('');
    const [personnel, setPersonnel] = useState([]);

    const [msg, setMsg] = useState('')
    const [msgClassName, setMsgClassName] = useState('')
    
    const match = useRouteMatch('/developers/:devId');
    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {

            await fetch(`${process.env.REACT_APP_API_URL}/devs/${match.params.devId}`)
                .then(async (res) => {
                    if (!res.ok) {
                        throw Error(res.statusText);
                    }
                    return res;
                })
                .then(async (res) => {
                    const data = await res.json();
                    // console.log(data);
                    setDevId(data.result.devId);
                    setName(data.result.name);
                    setOrigin(data.result.origin);
                    setTwitter(data.result.twitter);
                    setWebsite(data.result.website);
                    setPersonnel(data.result.personnel);

                    showApiRes(data.message)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        if (editMode) {
            fetchData();
            showRequest('Fetching data')
            // console.log("Developers fetched");
        }

        // console.log(location.pathname);
    }, [editMode, match.params.devId]);

    
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

    function handlePersonnelChange(value, index) {
        let _personnel = [...personnel];
        _personnel[index] = value;
        setPersonnel(_personnel)
    }

    function addPersonnel() {
        setPersonnel([...personnel, '']);
        // console.log('add');
    }

    function removePersonnel(index) {
        let _personnel = [...personnel];
        _personnel.splice(index, 1);
        setPersonnel(_personnel)
    }

    function handleSubmission() {

        setMsg('');
        if (!auth.isAuthenticated) {
            showError('Login is required for data alteration')
            return;
        }
        if (devId === '') {
            showError('devId is required and not filled');
            return;
        }
        if (name === '') {
            showError('name is required and not filled');
            return;
        }
        if (origin === '') {
            showError('origin is required and not filled');
            return;
        }
        if (origin.length !== 2) {
            showError('Invalid ISO country code');
            return;
        }

        // Data processing
        //////////////////////////////////

        let bodyContent = {
            devId,
            name,
            origin,
            website,
            twitter,
            personnel
        }

        // API allows change of devId
        // won't allow edit if new devId is not unique
        if (editMode && devId === match.params.devId.trim()) {
            delete bodyContent.devId;
        }

        bodyContent.origin.toUpperCase();

        const _url = (editMode)
            ? `${process.env.REACT_APP_API_URL}/devs/${match.params.devId}`
            : `${process.env.REACT_APP_API_URL}/devs/`;
        const _method = (editMode) ? 'PATCH' : 'POST';

        // Submission
        ///////////////////////////

        showRequest('Performing ' + _method)
        fetch(
            _url,
            {
                method: _method,
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                body: JSON.stringify(bodyContent)
            }
        )
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (editMode) {
                    showApiRes(`${data.message}; ${data.result.nModified} document has been updated.`)
                } else {
                    console.log(data)
                    showApiRes(`${data.message}; ${data.result.name} (${data.result.devId}) has been created.`)
                }
            })
    }

    function handleDeletion() {
        if (!auth.isAuthenticated) {
            showError('Login is required for data alteration')
            return;
        }
        if (window.confirm('Please confirm the deletion of this developer from the database. This will affect other documents using this entry, do make preparation before proceeding.')) {
            console.log('confirming deletion');
            fetch(`${process.env.REACT_APP_API_URL}/devs/${match.params.devId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`
                    },
                }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    showApiRes(`${data.message}; ${data.result.deletedCount} document has been deleted.`);
                })
        }
    }

    return (
        <div className="detail-panel">
            <div className="detail-panel-col-lt">
                {(!auth.isAuthenticated)
                    ? <p className="error">WARNING: You have not logged in. Your attempt to submit data will be denied.</p>
                    : ''
                }
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>devId</strong></span> (String, required): The unique identifier for the developers without space or capitalisation. When in doubt, using Twitter handle is usually a safe and good choice. This can be edited, but make sure the new value is also unique.</p>
                        <input type="text" value={devId} onChange={(e)=>setDevId((e.target.value).toLowerCase())}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>name</strong></span> (String, required): The full and formal capitalised name of the developer. This is what will be displayed for the most part.</p>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>origin</strong></span> (String, required): The base country of developer in <strong>ISO code</strong> (e.g. US, SE, SG). Two characters only.</p>
                        <input type="text" value={origin} onChange={(e)=>setOrigin(e.target.value.toUpperCase())} maxLength={2} pattern="[a-z]"></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>twitter</strong></span> (String): The Twitter handle of the developer, without full url and without the @ sign (e.g. <span className="var">adamatomic</span> for Adam Saltsman).</p>
                        <input type="text" value={twitter} onChange={(e)=>setTwitter(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>website</strong></span> (String): The full website url of the developer.</p>
                        <input type="text" value={website} onChange={(e)=>setWebsite(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>personnel</strong></span> (Array of Strings): A list of notable and/or key members of the group (when applicable). Highly optional. Don't fret it.</p>
                        {personnel.map((person, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={person}
                                    onChange={(event) => {
                                        handlePersonnelChange(event.target.value, index)
                                    }}
                                />
                                <button type="button" onClick={() => removePersonnel(index)}>X</button>
                            </div>
                        ))}
                    </label>
                    <button type="button" onClick={addPersonnel}>Add one more person</button>
                </div>
            </div>

            <div className="detail-panel-col-rt">
                <p className={msgClassName}>{msg}</p>
                <button className="detail-button" type="button" onClick={handleSubmission}>{(editMode) ? "Save" : "Create"}</button>
                <button className="detail-button" onClick={history.goBack}>Back</button>
                {(editMode)
                    ? <button className="detail-button delete-button" onClick={handleDeletion}>Delete</button>
                    : ''}
            </div>
        </div>
    )
}
