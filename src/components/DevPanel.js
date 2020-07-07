import React, { useState, useEffect } from 'react';
import DevCard from './DevCard';
import '../styles.scss';

export default function DevPanel({devs}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(devs);

    useEffect(()=>{
        async function setInitResults() {
            setSearchResult(devs);
        }
        setInitResults();
        // console.log('triggered');
        document.title = "Developers - EbonyMemo admin panel";
    }, [devs])

    function handleChange(e) {
        setSearchTerm(e.target.value);
        updateSearchResults(e.target.value);
    }

    function updateSearchResults(str) {
        let results = [];
        // console.log(devs)
        // for (const dev in devs) {
        devs.forEach((dev)=> {
            // console.log(dev.name);
            if (dev.devId.substring(0, str.length) === str) {
                results.push(dev);
            }
        })
        //     console.log(dev.name);
        //     // if (dev.devId.substring(0, str.length) === str) {
        //     //     results.push(dev);
        //     // }
        // }
        setSearchResult(results);
    }

    return (
        <div className="panel">
            <input type="text" value={searchTerm} onChange={handleChange}></input>
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
