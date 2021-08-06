import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Comics = ({ filter, setFilter }) => {
    const [comics, setComics] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState(0);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://marvel-api-cyril.herokuapp.com/comics?skip=${skip}&title=${search}`,
            );
            setComics(response.data.results);
            setPages(Math.ceil(response.data.count / response.data.limit));
            setIsLoading(false);
        };
        fetchData();
    }, [skip, search]);

    return (
        <section className="comics-section">
            <div className="filter">
                {filter ? (
                    <form>
                        <input
                            type="search"
                            placeholder="Nom du comic..."
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
                                setFilter(false);
                                setSkip(0);
                            }}
                        >
                            Réinitiliser
                        </button>
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
            <div className="wrapper">
                {isLoading ? (
                    <span>En attente de chargement</span>
                ) : (
                    <div className="comics-list">
                        {comics.map((comic) => {
                            return (
                                <div
                                    className="comic-image"
                                    key={comic._id}
                                    onClick={() => {
                                        history.push({
                                            pathname: `/comic/${comic._id}`,
                                            state: {
                                                path: comic.thumbnail.path,
                                                extension: comic.thumbnail.extension,
                                                description: comic.description,
                                                title: comic.title,
                                                id: comic._id,
                                            },
                                        });
                                    }}
                                >
                                    <img
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                    />
                                    <div className="description">
                                        <h4>{comic.title}</h4>
                                    </div>
                                    {/* <FontAwesomeIcon icon="heart" /> */}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Comics;
