import React, { useState, useEffect } from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
// import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DevPanel from './components/DevPanel';
import GamePanel from './components/GamePanel';
import About from './components/About';
import DevDetails from './components/DevDetails';
import { ReactQueryDevtools } from 'react-query-devtools';

function App() {
    // const [devs, setDevs] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchData();
        // document.title = "EbonyMemo admin"
    }, [])

    async function fetchData() {
        await fetch('https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/')
            .then(async (res) => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res;
            })
            .then(async (res) => {
                const data = await res.json();
                setGames(data.result);
            })
            .catch(err => {
                console.log(err);
            })


    }

    return (
        <div className="app">
            <Header />
            <ReactQueryDevtools />
            <Router>
                <Navbar />
                <hr></hr>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/developers">
                        <DevPanel/>
                    </Route>
                    <Route exact path="/games">
                        <GamePanel games={games}/>
                    </Route>
                    <Route path="/about">
                        <About/>
                    </Route>
            
                    <Route path="/developers/new">
                        <DevDetails editMode={false}/>
                    </Route>
                    <Route path="/developers/:devId">
                        <DevDetails editMode={true}/>
                    </Route>
                </Switch>
                {/* <Footer /> */}
            </Router>
        </div>
    );
}

// function findDev(id) {

//     return dev.devId === id
// }

export default App;
