import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ modal, setModal }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://marvel-api-cyril.herokuapp.com/characters',
                );
                console.log(response.data.results);
                setCharacters(response.data.results);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="home-section">
            <div className="wrapper">
                {isLoading ? (
                    <span>En attente de chargement</span>
                ) : (
                    <div className="character-list">
                        {characters.map((character) => {
                            return (
                                <Link
                                    to={`/character/${character._id}`}
                                    key={character._id}
                                >
                                    <div className="character-image">
                                        <img
                                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                            alt={character.name}
                                        />
                                        <div className="description">
                                            <h4>{character.name}</h4>
                                            {character.description && (
                                                <p>{character.description} </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
