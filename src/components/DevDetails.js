import React, { useState, useEffect } from 'react';
import {useRouteMatch, Link} from 'react-router-dom';
import '../styles.scss';

export default function DevDetails({editMode}) {

    const [devId, setDevId] = useState('');
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [website, setWebsite] = useState('');
    const [personnel, setPersonnel] = useState([]);

    const [error, setError] = useState('');
    const [backendRes, setBackendRes] = useState('');
    // const location = useLocation();
    const match = useRouteMatch('/developers/:devId');
    // const location = useLocation();

    useEffect(() => {
        async function fetchData() {

            // const { isLoading, error, data } = useQuery("devs", async () => {
                
            // })

            await fetch(`https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/${match.params.devId}`)
                .then(async (res) => {
                    if (!res.ok) {
                        throw Error(res.statusText);
                    }
                    return res;
                })
                .then(async (res) => {
                    const data = await res.json();
                    // console.log(data);
                    setDevId(data.devId);
                    setName(data.name);
                    setOrigin(data.origin);
                    setTwitter(data.twitter);
                    setWebsite(data.website);
                    setPersonnel(data.personnel);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        if (editMode) {
            fetchData();
            // console.log("Developers fetched");
        }

        // console.log(location.pathname);
    }, [editMode, match.params.devId]);

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
        
        // setPersonnel([])
        // console.log('remove');
    }

    function handleSubmission() {

        setBackendRes('');
        if (devId === '') {
            setError('devId is required and not filled');
            return;
        }
        if (name === '') {
            setError('name is required and not filled');
            return;
        }
        if (origin === '') {
            setError('origin is required and not filled');
            return;
        }
        if (origin.length !== 2) {
            setError('Invalid ISO country code');
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
        if (editMode && devId === match.params.devId) {
            delete bodyContent.devId;
        }

        bodyContent.origin.toUpperCase();
        // `http://localhost:3000/.netlify/functions/server/devs/${match.params.devId}`
        // `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/${match.params.devId}`

        const _url = (editMode)
            ? `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/${match.params.devId}`
            : `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/`;
        const _method = (editMode) ? 'PATCH' : 'POST';

        // Submission
        ///////////////////////////

        fetch(
            _url,
            {
                method: _method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyContent)
            }
        )
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (editMode) {
                    setBackendRes(`${data.message}; ${data.result.nModified} document has been updated.`)
                } else {
                    console.log(data)
                    setBackendRes(`${data.message}; ${data.result.name} (${data.result.devId}) has been created.`)
                }
            })
            setError('');
    }

    function handleDeletion() {
        if (window.confirm('Please confirm the deletion of this developer from the database. This will affect other documents using this entry, do make preparation before proceeding.')) {
            // console.log('confirm deletion');
            fetch(`https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/${match.params.devId}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setBackendRes(`${data.message}; ${data.result.deletedCount} document has been deleted.`);
                })
        }
    }

    return (
        <div className="detail-panel">
            <div className="detail-panel-col-lt">
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>devId</strong></span> (String, required): the unique identifier for the developers without space or capitlisation. When in doubt, using Twitter handle is usually a safe and good choice. This can be edited, but make sure the new value is also unique.</p>
                        <input type="text" value={devId} onChange={(e)=>setDevId(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>name</strong></span> (String, required): the full and formal capitalised name of the developer. This is what will be displayed for the most part.</p>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>origin</strong></span> (String, required): the base country of developer in <strong>ISO code</strong> (e.g. US, SE, SG). Two characters only.</p>
                        <input type="text" value={origin} onChange={(e)=>setOrigin(e.target.value.toUpperCase())} maxLength={2} pattern="[a-z]"></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>twitter</strong></span> (String): the Twitter handle of the developer, without full url and without the @ sign (e.g. <span className="var">adamatomic</span> for Adam Saltsman).</p>
                        <input type="text" value={twitter} onChange={(e)=>setTwitter(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>website</strong></span> (String): the full website url of the developer.</p>
                        <input type="text" value={website} onChange={(e)=>setWebsite(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="code"><strong>personnel</strong></span> (Array of  Strings): a list of notable and/or key members of the group (when applicable). Highly optional. Don't fret it.</p>
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
                <p className="error">{error}</p>
                <p className="api-res">{backendRes}</p>
                <button className="detail-button" type="button" onClick={handleSubmission}>{(editMode) ? "Save" : "Create"}</button>
                <Link to="/developers"><button className="detail-button">Back</button></Link>
                {(editMode)
                    ? <button className="detail-button delete-button" onClick={handleDeletion}>Delete</button>
                    : ''}
            </div>
        </div>
    )
}
