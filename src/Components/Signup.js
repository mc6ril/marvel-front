import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

const Signup = ({ setLogin, setSignup, setUser, setModal }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios({
                method: 'POST',
                url: 'https://marvel-api-cyril.herokuapp.com/user/signup',
                data: {
                    username: username,
                    email: email,
                    password: password,
                },
            });
            if (response.data.token) {
                setUser(response.data.token);
                history.push('/');
                setModal(false);
            } else {
                alert('Une erreur est survenue, veuillez réssayer.');
            }
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMessage('Cet email a déjà un compte chez nous !');
            }
            console.log(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <input type="submit" value="Inscription" />
            {errorMessage && <p>{errorMessage}</p>}
            <p
                onClick={() => {
                    setSignup(false);
                    setLogin(true);
                }}
            >
                Déjà membre ? Connectez-vous !
            </p>
        </form>
    );
};

export default Signup;
