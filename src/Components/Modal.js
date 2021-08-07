import { useState } from 'react/cjs/react.development';
import Login from './Login';
import Signup from './Signup';

const Modal = ({ setModal, setUser }) => {
    const [login, setLogin] = useState(true);
    const [signUp, setSignup] = useState(false);
    return (
        <div className="form">
            <div className="closure" onClick={() => setModal(false)}>
                <span></span>
                <span></span>
            </div>
            <h1>{login ? 'Connexion' : 'Inscription'}</h1>
            {signUp ? (
                <Signup
                    setModal={setModal}
                    setLogin={setLogin}
                    setSignup={setSignup}
                    setUser={setUser}
                />
            ) : (
                <Login
                    setModal={setModal}
                    setLogin={setLogin}
                    setSignup={setSignup}
                    setUser={setUser}
                />
            )}
        </div>
    );
};

export default Modal;
