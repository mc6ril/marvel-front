import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Character = () => {
    const [character, setCharacter] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://marvel-api-cyril.herokuapp.com/character/${id}`,
                );
                console.log(response.data);
                setCharacter(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [id]);

    console.log(character);

    return (
        <section className="character-data">
            {isLoading ? (
                <span>En cours de chargement </span>
            ) : (
                <div className="wrapper">hello</div>
            )}
        </section>
    );
};

export default Character;
