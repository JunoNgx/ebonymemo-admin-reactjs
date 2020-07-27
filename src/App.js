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
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <div className="app">
            <Header />
            <Router>
                <AuthProvider>
                    <Navbar />
                    <hr/>
                    <Switch>

                        <Route exact path="/">
                            <Home/>
                        </Route>

                        <Route exact path="/developers">
                            <ItemList type="dev"/>
                        </Route>
                        <ProtectedRoute path="/developers/new">
                            <DevDetails editMode={false}/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/developers/:devId">
                            <DevDetails editMode={true}/>
                        </ProtectedRoute>

                        <Route exact path="/games">
                            <ItemList type="game"/>
                        </Route>
                        <ProtectedRoute path="/games/new">
                            <GameDetails editMode={false}/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/games/:gameId">
                            <GameDetails editMode={true}/>
                        </ProtectedRoute>
                        
                        <Route path="/about">
                            <About/>
                        </Route>
                
                    </Switch>
                    {/* <Footer /> */}
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;