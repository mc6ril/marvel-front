import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const ComicDescription = ({ comicFavoris, setComicFavoris }) => {
    const [comic, setComic] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { path, extension, id } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `https://marvel-api-cyril.herokuapp.com/comic/${id}`,
            );
            setComic(response.data);
            setIsLoading(false);
        };
        fetchData();
    }, [id]);

    return isLoading ? (
        <Loader />
    ) : (
        <section className="comic-data">
            <div className="wrapper">
                <div className="comic-image">
                    <img src={`${path}.${extension}`} alt={comic.title} />
                </div>
                <div className="comic-description">
                    <h1>{comic.name}</h1>
                    <p>{comic.description}</p>
                    <FontAwesomeIcon
                        icon="heart"
                        onClick={() => {
                            let tab = [...comicFavoris];
                            Object.values(tab).indexOf(id) === -1
                                ? tab.push(id)
                                : tab.splice(Object.values(tab).indexOf(id), 1);
                            setComicFavoris(tab);
                        }}
                        className={
                            Object.values(comicFavoris).indexOf(id) !== -1
                                ? 'favoris'
                                : 'not-favoris'
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default ComicDescription;
