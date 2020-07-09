import React from 'react';
import './styles.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
// import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemList from './components/ItemList';
import About from './components/About';
import DevDetails from './components/DevDetails';
import GameDetails from './components/GameDetails';

function App() {
    return (
        <div className="app">
            <Header />
            <Router>
                <Navbar />
                <hr/>
                <Switch>

                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route exact path="/developers">
                        <ItemList type="dev"/>
                    </Route>
                    <Route path="/developers/new">
                        <DevDetails editMode={false}/>
                    </Route>
                    <Route path="/developers/:devId">
                        <DevDetails editMode={true}/>
                    </Route>

                    <Route exact path="/games">
                        <ItemList type="game"/>
                    </Route>
                    <Route path="/games/new">
                        <GameDetails editMode={false}/>
                    </Route>
                    <Route path="/games/:gameId">
                        <GameDetails editMode={true}/>
                    </Route>
                    

                    <Route path="/about">
                        <About/>
                    </Route>
            
                </Switch>
                {/* <Footer /> */}
            </Router>
        </div>
    );
}

export default App;
