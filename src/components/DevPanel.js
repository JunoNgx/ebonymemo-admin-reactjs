import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DevCard from './DevCard';
import '../styles.scss';

export default function DevPanel() {
    const [devs, setDevs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            await fetch('https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/')
            .then(async (res) => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res;
            })
            .then(async res => {
                const data = await res.json();
                setDevs(data.result);
            })
            .catch(err => {
                console.log(err);
            })

            console.log('Developers fetched');
        }

        fetchData();
        document.title = "Developers - EbonyMemo admin panel";
        
    }, [])

    useEffect(()=> {
        setSearchResult(devs);
    }, [devs])

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
        updateSearchResults(e.target.value);
    }

    function updateSearchResults(str) {
        let results = [];
        devs.forEach((dev)=> {
            if (dev.devId.substring(0, str.length) === str) {
                results.push(dev);
            }
        })
        setSearchResult(results);
    }

    return (
        <div className="panel">
            <Link to="developers/new"><button className="create-button">Create new developer</button></Link>
            <input type="text" value={searchTerm} onChange={handleSearchChange}></input>
            <table>
                <thead></thead>
                <tbody>
                    {searchResult.map((dev, index) => (
                        <DevCard key={dev.devId} dev={dev}/>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}
