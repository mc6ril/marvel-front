import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const ComicDescription = () => {
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
                </div>
            </div>
        </section>
    );
};

export default ComicDescription;
