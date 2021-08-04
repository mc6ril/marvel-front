import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="wrapper">
            <nav>
                <ul>
                    <div className="logo">
                        <Link to="/">
                            <h1>Marvel</h1>
                        </Link>
                    </div>
                    <div className="header-menu">
                        <Link to="/">
                            <li>Personnages</li>
                        </Link>
                        <Link to="/comics">
                            <li>Comics</li>
                        </Link>
                        <Link to="/favorites">
                            <li>Favoris</li>
                        </Link>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
