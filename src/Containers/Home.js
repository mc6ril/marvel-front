import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Home = ({ modal, setModal }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState();
    const history = useHistory();

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

    console.log(characters);

    return (
        <section className="home-section">
            <div className="wrapper">
                {isLoading ? (
                    <span>En attente de chargement</span>
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
