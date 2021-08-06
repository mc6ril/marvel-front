import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CharacterDescription from './Components/CharacterDescription';
import ComicDescription from './Components/ComicDescription';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import Character from './Containers/Characters';
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

            {!burger && (
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/characters">
                        <Character filter={filter} setFilter={setFilter} />
                    </Route>
                    <Route exact path="/character/:id">
                        <CharacterDescription />
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
            <Footer />
        </Router>
    );
}

export default App;
