import { Link } from 'react-router-dom';
import comic from '../Styles/images/comic.jpg';
import character from '../Styles/images/cpt-marvel.jpg';

const Home = () => {
    return (
        <section className="home-section">
            <div className="wrapper">
                <div className="home-menu">
                    <div className="left-col">
                        <h1>Personnages</h1>
                        <Link to="/characters">
                            <img src={character} alt={character} />
                        </Link>
                    </div>

                    <div className="right-col">
                        <h1>Comics</h1>
                        <Link to="/comics">
                            <img src={comic} alt={comic} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
