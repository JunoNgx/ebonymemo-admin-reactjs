import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import DevCard from './DevCard';
import GameCard from './GameCard';
import '../styles.scss';
import { AuthContext } from './AuthContext';

export default function ItemList({type}) {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [typeVars, setTypeVars] = useState({
        // // url: 'https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/',
        // url: `${process.env.REACT_APP_API_URL}/devs`,
        // idVar: "devId",
        // createButtonLabel: "Create New Developer",
        // createButtonLink: "developers/new"
    })

    const auth = useContext(AuthContext);

    async function fetchData() {
        await fetch(typeVars.url)
        .then(async (res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res;
        })
        .then(async res => {
            const data = await res.json();
            setItems(data.result);
            setIsFetched(true);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function setTypeVariables() {
        if (type === "dev") {
            setTypeVars({
                // url: 'https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/devs/',
                url: `${process.env.REACT_APP_API_URL}/devs`,
                idVar: "devId",
                createButtonLabel: "Create New Developer",
                createButtonLink: "developers/new"
            })
        } else if (type === "game") {
            setTypeVars({
                // url: 'https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/',
                url: `${process.env.REACT_APP_API_URL}/games`,
                idVar: "gameId",
                createButtonLabel: "Create New Game",
                createButtonLink: "games/new"
            })
        }
    }

    useEffect(()=>{
        setIsFetched(false);
        setTypeVariables();
        document.title = "Developers - EbonyMemo admin panel"
    }, [type])
    useEffect(()=> { fetchData(); }, [typeVars])
    useEffect(()=> { setSearchResult(items); }, [items])

    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
        updateSearchResults(e.target.value);
    }

    function updateSearchResults(str) {
        let results = [];
        items.forEach((item)=> {
            if (item[typeVars.idVar].substring(0, str.length) === str) {
                results.push(item);
            }
        })
        setSearchResult(results);
    }

    return (
        <div className="item-list">
            {/* {(!auth.isAuthenticated)
                ? <p className="error">Login is required for data access and modification.</p>
                : <Link to={typeVars.createButtonLink}><button className="create-button">{typeVars.createButtonLabel}</button></Link>
            }       */}
            <Link to={typeVars.createButtonLink}><button className="create-button">{typeVars.createButtonLabel}</button></Link>
            <input type="text" value={searchTerm} onChange={handleSearchChange}></input>
            {(isFetched)
                ? <table>
                    <thead></thead>
                    <tbody>
                        <List type={type} searchResult={searchResult}/>
                    </tbody>
                    <tfoot></tfoot>
                </table>
                : <p>Data is being fetched. Please wait.</p>
            }
        </div>
    )
}

function List({type, searchResult}) {
    if (type ==="dev") {
        return <>
            {searchResult.map((dev, index) => (
                <DevCard key={dev.devId} dev={dev}/>
            ))}
        </>
    } else if (type === "game") {
        return <>
            {searchResult.map((game, index) => (
                <GameCard key={game.gameId} game={game}/>
            ))}
        </>
    }
}