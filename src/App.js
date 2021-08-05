import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Character from './Components/Character';
import ScrollToTop from './Components/ScrollToTop';
import Comics from './Containers/Comics';
import Header from './Containers/Header';
import Home from './Containers/Home';
library.add(faHeart);

function App() {
    const [filter, setFilter] = useState(false);
    return (
        <Router>
            <ScrollToTop />
            <Header />
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
                <Route exact path="/favorites">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
