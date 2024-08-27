import { NavLink } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import styles from './PostCard.module.scss';

const PostCard = (props) => {
    return(
        <Card className={styles.postcard}>
            <Card.Body>
                <Card.Title>
                    <span className={styles.posttitle}>{props.postTitle}</span>
                </Card.Title>
                <Card.Text className={styles.postinfo}>
                    <span>Author:</span><span className={styles.postauthor}>{props.postAuthor}</span><br />
                    <span >Date:</span><span className={styles.postdate}>{props.postPublishedDate}</span>
                </Card.Text>
                <Card.Text className={styles.descriptioncontainer}>
                    <span className={styles.postdescription}>{props.postShort}</span>
                </Card.Text>
            </Card.Body>
            <NavLink to={`/post/${props.id}`}>
                <Button className={`${styles.cardbutton} custom-button`}>Read more</Button>
            </NavLink>
        </Card>
    )
}

export default PostCard;