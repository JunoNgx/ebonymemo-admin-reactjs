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
    const [backendRes, setbackendRes] = useState('');
    // const location = useLocation();
    const match = useRouteMatch('/developers/:devId');

    useEffect(() => {
        async function fetchData() {
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
        // console.log(`https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/${match.params.devId}`);
        fetchData();
    }, []);

    function handlePersonnelChange(value, index) {
        let _personnel = [...personnel];
        _personnel[index] = value;
        setPersonnel(_personnel)
    }

    function addPersonnel() {
        setPersonnel([...personnel, '']);
    }

    function removePersonnel(index) {
        // console.log();
        let _personnel = [...personnel];
        _personnel.splice(index, 1);
        setPersonnel(_personnel)
    }

    function handleSubmission() {
        // `https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/${match.params.devId}`

        setbackendRes('');
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
        if (origin.length != 2) {
            setError('Invalid ISO country code');
            return;
        }

        let bodyContent = {
            name,
            origin,
            website,
            twitter,
            personnel
        }
        if (devId !== match.params.devId) {
            bodyContent.devId = devId;
        }

        fetch(
            `http://localhost:3000/.netlify/functions/server/devs/${match.params.devId}`,
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bodyContent)
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setbackendRes(`${data.message}; ${data.result.nModified} document has been updated.`)
            })

            setError('');
    }

    let submitButton;
    if (editMode) {
        submitButton = <button type="button" onClick={handleSubmission}>Save</button>
    } else {
        submitButton = <button>Create</button>
    }

    return (
        <div className="detail-panel">
            <div className="detail-panel-col-lt">
                <div className="detail-panel-item">
                    <label>
                        <p><span className="var"><strong>devId</strong></span> (String, required): the unique identifier for the developers without space or capitlisation. When in doubt, using Twitter handle is usually a safe and good choice. This can be edited, but make sure the new value is also unique.</p>
                        <input type="text" value={devId} onChange={(e)=>setDevId(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="var"><strong>name</strong></span> (String, required): the full and formal capitalised name of the developer. This is what will be displayed for the most part.</p>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="var"><strong>origin</strong></span> (String, required): the base country of developer in <strong>ISO code</strong> (e.g. US, SE, SG).Uppercase formatting is optional and will be handled by the backend.</p>
                        <input type="text" value={origin} onChange={(e)=>setOrigin(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="var"><strong>twitter</strong></span> (String): the twitter handle of the developer, without full url and without the @ sign (e.g. <span className="var">adamatomic</span> for Adam Saltsman).</p>
                        <input type="text" value={twitter} onChange={(e)=>setTwitter(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="var"><strong>website</strong></span> (String): the full website url of the developer.</p>
                        <input type="text" value={website} onChange={(e)=>setWebsite(e.target.value)}></input>
                    </label>
                </div>
                <div className="detail-panel-item">
                    <label>
                        <p><span className="var"><strong>personnel</strong></span> (Array of  Strings): a list of notable and/or key members of the group (when applicable). Blank entries will automatically be omitted upon submission.</p>
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
                        <button type="button" onClick={addPersonnel}>Add one more field</button>
                    </label>
                    
                </div>
            </div>

            <div className="detail-panel-col-rt">
                <p className="error">{error}</p>
                <p className="api-res">{backendRes}</p>
                {submitButton}
                <Link to="/developers"><button>Back</button></Link>
            </div>
        </div>
    )
}
