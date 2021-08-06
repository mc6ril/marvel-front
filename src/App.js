import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Character from './Components/Character';
import ComicDescription from './Components/ComicDescription';
import ScrollToTop from './Components/ScrollToTop';
import Comics from './Containers/Comics';
import Header from './Containers/Header';
import Home from './Containers/Home';
library.add(faHeart);

function App() {
    const [filter, setFilter] = useState(false);
    const [burger, setBurger] = useState(false);

    return (
        <Router>
            <ScrollToTop />
            <Header burger={burger} setBurger={setBurger} />
            {burger ? (
                <div className="slide-menu">
                    <Link
                        to="/"
                        onClick={() => {
                            setBurger(false);
                        }}
                    >
                        <li>Personnages</li>
                    </Link>
                    <Link
                        to="/comics"
                        onClick={() => {
                            setBurger(false);
                        }}
                    >
                        <li>Comics</li>
                    </Link>
                    <Link
                        to="/favorites"
                        onClick={() => {
                            setBurger(false);
                        }}
                    >
                        <li>Favoris</li>
                    </Link>
                </div>
            ) : (
                <Switch>
                    <Route exact path="/">
                        <Home filter={filter} setFilter={setFilter} />
                    </Route>
                    <Route exact path="/character/:id">
                        <Character />
                    </Route>
                    <Route exact path="/comics">
                        <Comics filter={filter} setFilter={setFilter} />
                    </Route>
                    <Route exact path="/comic/:id">
                        <ComicDescription />
                    </Route>
                    <Route exact path="/favorites">
                        <Home />
                    </Route>
                </Switch>
            )}
        </Router>
    );
}

export default App;
