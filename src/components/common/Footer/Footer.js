import { Container } from "react-bootstrap";
import styles from './Footer.module.scss'

const Footer = () => {
    return(
        <Container>
            <div className={styles.footercontainer}><p className={styles.footercontent}>Copyright © BlogApp 2024</p></div>
        </Container>
    )
}

export default Footer;