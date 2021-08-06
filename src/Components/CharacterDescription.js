import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CharacterDescription = () => {
    const [character, setCharacter] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { path, extension, id } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://marvel-api-cyril.herokuapp.com/comics/${id}`,
                );
                setCharacter(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [id]);

    return isLoading ? (
        <span>En cours de chargement </span>
    ) : (
        <section className="character-data">
            <div className="wrapper">
                <div className="character-image">
                    <img src={`${path}.${extension}`} alt={character.title} />
                </div>
                <div className="character-description">
                    <h1>{character.name}</h1>
                    <p>{character.description}</p>
                </div>
                <div className="character-comics-list">
                    {character.comics.map((comic) => {
                        return (
                            <div className="charachter-comics" key={comic._id}>
                                <div className="comic-image">
                                    <img
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                    />
                                </div>

                                <div className="comic-information">
                                    <h4>{comic.title}</h4>
                                    <p>{comic.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CharacterDescription;
