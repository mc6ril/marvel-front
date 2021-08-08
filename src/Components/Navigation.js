import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ burger, setBurger, modal, setModal, userToken, setUser }) => {
    const [width, setWidth] = useState();

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        width > 600 && setBurger(false);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [width, setBurger]);

    return (
        <div>
            <nav>
                <ul className="wrapper">
                    <div className="logo">
                        <Link to="/">
                            <h1>Marvel</h1>
                        </Link>
                    </div>
                    <div className={burger ? 'mobile-menu' : 'active-menu'}>
                        <Link
                            to="/characters"
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
                        {userToken && (
                            <Link to="/favorites">
                                <li>Favoris</li>
                            </Link>
                        )}

                        {userToken ? (
                            <Link
                                to="/"
                                onClick={() => {
                                    setUser(null);
                                    setBurger(false);
                                }}
                            >
                                <li>Se déconnecter</li>
                            </Link>
                        ) : (
                            <Link
                                to="/"
                                onClick={() => {
                                    setModal(!modal);
                                    setBurger(false);
                                }}
                            >
                                <li>Se connecter</li>
                            </Link>
                        )}
                    </div>
                    <div
                        className={burger ? 'burger active' : 'burger'}
                        onClick={() => {
                            setBurger(!burger);
                        }}
                    >
                        <span></span>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
