import Navigation from '../Components/Navigation';
import backgroundImage from '../Styles/images/test3.png';

const Header = () => {
    return (
        <header>
            <div className="header-image">
                <img src={backgroundImage} alt={backgroundImage} />
            </div>
            <Navigation />
        </header>
    );
};

export default Header;
