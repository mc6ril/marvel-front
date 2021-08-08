import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
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
    const [burger, setBurger] = useState(false);
    const [modal, setModal] = useState(false);
    const [comicFavoris, setComicFavoris] = useState([]);
    const [userToken, setUserToken] = useState(Cookies.get('userToken' || null));

    const setUser = (token) => {
        if (token) {
            Cookies.set('userToken', token, {
                expires: 3,
                sameSite: 'none',
                secure: true, //htpps
            });
            setUserToken(token);
        } else {
            Cookies.remove('userToken');
            setUserToken(null);
        }
    };

    return (
        <Router>
            <ScrollToTop />
            <Header
                burger={burger}
                setBurger={setBurger}
                modal={modal}
                setModal={setModal}
                setUser={setUser}
                userToken={userToken}
            />

            {!burger && (
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/characters">
                        <Character />
                    </Route>
                    <Route exact path="/character/:id">
                        <CharacterDescription />
                    </Route>
                    <Route exact path="/comics">
                        <Comics />
                    </Route>
                    <Route exact path="/comic/:id">
                        <ComicDescription
                            comicFavoris={comicFavoris}
                            setComicFavoris={setComicFavoris}
                        />
                    </Route>
                </Switch>
            )}
            <Footer />
        </Router>
    );
}

export default App;
