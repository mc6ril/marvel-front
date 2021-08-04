import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Character = () => {
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
    console.log('mon objet est == > ', character);

    return (
        <section className="character-data">
            {isLoading ? (
                <span>En cours de chargement </span>
            ) : (
                character.comics.map((comic) => {
                    <div className="character-comics" key={comic._id}>
                        <div className="comic-image">
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.thumbnail.title}
                            />
                        </div>
                        <div className="comic-information">
                            <h4>{comic.thumbnail.title}</h4>
                            <p>{comic.thumbnail.description}</p>
                        </div>
                    </div>;
                })
            )}
        </section>
    );
};

export default Character;

// <div className="wrapper">
//     <div>
//         <img src={`${path}.${extension}`} alt="character-marvel" />
//     </div>
{
    /* </div> */
}
