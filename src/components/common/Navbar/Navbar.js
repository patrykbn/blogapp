import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={styles.navcontainer}>
            <nav className={styles.navbar}>
                <div className={styles.navtaskcontainer}>
                    <p className={styles.apptitle}>Blog App</p>
                </div>
                <div className={styles.navbuttoncontainer}>
                    <ul className={styles.navlinks}>
                        <li><NavLink className={styles.homenav} to="/">Home</NavLink></li>
                        <li><NavLink className={styles.aboutnav} to="/About">About</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;