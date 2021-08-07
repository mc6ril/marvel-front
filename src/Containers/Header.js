import Modal from '../Components/Modal';
import Navigation from '../Components/Navigation';
import backgroundImage from '../Styles/images/test3.png';

const Header = ({ burger, setBurger, modal, setModal, userToken, setUser }) => {
    return (
        <header>
            {!burger && (
                <div className={modal ? 'header-image-opacity' : 'header-image'}>
                    <img src={backgroundImage} alt={backgroundImage} />
                </div>
            )}

            <Navigation
                burger={burger}
                setBurger={setBurger}
                modal={modal}
                setModal={setModal}
                userToken={userToken}
                setUser={setUser}
            />
            {modal ? <Modal setModal={setModal} setUser={setUser} /> : null}
        </header>
    );
};

export default Header;
