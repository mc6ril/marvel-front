import Navigation from '../Components/Navigation';
import backgroundImage from '../Styles/images/test3.png';

const Header = ({ burger, setBurger }) => {
    return (
        <header>
            {!burger && (
                <div className="header-image">
                    <img src={backgroundImage} alt={backgroundImage} />
                </div>
            )}

            <Navigation burger={burger} setBurger={setBurger} />
        </header>
    );
};

export default Header;
