import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

const Login = ({ setLogin, setSignup, setUser, setModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'https://marvel-api-cyril.herokuapp.com/user/login',
            data: {
                email: email,
                password: password,
            },
        })
            .then((response) => {
                const token = response.data.token;
                setUser(token);
                history.push('/');
                setModal(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <input type="submit" value="Login" />
            <p
                onClick={() => {
                    setLogin(false);
                    setSignup(true);
                }}
            >
                Pas encore membre ? Inscrivez-vous !
            </p>
        </form>
    );
};

export default Login;
