import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Character from './Components/Character';
import Header from './Containers/Header';
import Home from './Containers/Home';

function App() {
    const [filter, setFilter] = useState(false);
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home filter={filter} setFilter={setFilter} />
                </Route>
                <Route exact path="/character/:id">
                    <Character />
                </Route>
                <Route exact path="/comics/:id">
                    <Home />
                </Route>
                <Route exact path="/favorites">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
