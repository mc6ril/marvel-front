import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Home = ({ filter, setFilter }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState();
    const [pages, setPages] = useState(0);
    const [value, setValue] = useState(1);
    const history = useHistory();

    let skip = 0;
    if (value > 1) {
        skip = value * 100;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://marvel-api-cyril.herokuapp.com/characters?skip=${skip}`,
                );
                console.log(response.data);
                setCharacters(response.data.results);
                setPages(Math.ceil(response.data.count / response.data.limit));
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [skip]);

    return (
        <section className="home-section">
            <div className="wrapper">
                {isLoading ? (
                    <span>En attente de chargement</span>
                ) : (
                    <div className="character-list">
                        <div className="filter">
                            {filter ? (
                                <form>
                                    <input
                                        type="search"
                                        placeholder="Nom du personnage..."
                                    />
                                    {/* Pagination */}

                                    {value > 1 && (
                                        <button
                                            onClick={() => {
                                                let newValue = value - 1;
                                                setValue(newValue);
                                            }}
                                        >
                                            -
                                        </button>
                                    )}

                                    <p>{value}</p>
                                    {value < pages && (
                                        <button
                                            onClick={() => {
                                                let newValue = value + 1;
                                                setValue(newValue);
                                            }}
                                        >
                                            +
                                        </button>
                                    )}
                                    <br />

                                    <input
                                        type="reset"
                                        placeholder="Réinitiliser"
                                        onClick={() => {
                                            setFilter(false);
                                        }}
                                    />
                                </form>
                            ) : (
                                <button
                                    onClick={() => {
                                        setFilter(!filter);
                                    }}
                                >
                                    Filtres
                                </button>
                            )}
                        </div>

                        {characters.map((character) => {
                            return (
                                <div
                                    className="character-image"
                                    key={character._id}
                                    onClick={() => {
                                        history.push({
                                            pathname: `/character/${character._id}`,
                                            state: {
                                                path: character.thumbnail.path,
                                                extension: character.thumbnail.extension,
                                                id: character._id,
                                            },
                                        });
                                    }}
                                >
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
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
