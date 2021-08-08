import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loader from '../Components/Loader';

const Character = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState();
    const [pages, setPages] = useState(0);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://marvel-api-cyril.herokuapp.com/characters?skip=${skip}&name=${search}`,
                );
                setCharacters(response.data.results);
                setPages(Math.ceil(response.data.count / response.data.limit));
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [skip, search]);

    return (
        <section className="character-section">
            <h1>Personnages</h1>
            <div className="filter">
                <form>
                    <input
                        type="search"
                        placeholder="Nom du personnage..."
                        value={search}
                        onChange={(e) => {
                            setSkip(0);
                            setSearch(e.target.value);
                        }}
                    />
                    {/* Pagination */}

                    {skip ? (
                        <button
                            type="button"
                            onClick={() => {
                                let newSkip = skip - 100;
                                setSearch('');
                                setSkip(newSkip);
                            }}
                        >
                            Page précédente
                        </button>
                    ) : null}

                    {skip < pages * 100 && (
                        <button
                            type="button"
                            onClick={() => {
                                let newSkip = skip + 100;
                                setSearch('');
                                setSkip(newSkip);
                            }}
                        >
                            Page suivante
                        </button>
                    )}

                    <button
                        type="reset"
                        onClick={() => {
                            setSkip(0);
                        }}
                    >
                        Réinitiliser
                    </button>
                </form>
            </div>
            <div className="wrapper">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="character-list">
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
                                                description: character.description,
                                                name: character.name,
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

export default Character;
