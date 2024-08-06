import styles from './Header.module.scss';
import logo from '../../assets/circular-logo-noBG.webp';
import { CgProfile, CgSearch } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    console.log('handleProfileClick');
  };

  const handleSearchClick = () => {
    console.log('handleSearchClick');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <button onClick={() => navigate('/')}>
            <a>
              <img src={logo} alt="my-recipes-logo" className={styles.logo} />
            </a>
          </button>
          <h1>My Recipes</h1>
        </div>
        <nav>
          <div className={styles.btnsContainer}>
            <button onClick={handleProfileClick}>
              <CgProfile />
            </button>
            <button onClick={handleSearchClick}>
              <CgSearch />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
