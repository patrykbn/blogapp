import styles from './Main.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchPostsThunk, getAllPosts } from '../../../redux/postsRedux';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../common/PostCard/PostCard';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Main = () => {

    const dispatch = useDispatch();
    const posts = useSelector(state => getAllPosts(state));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchPostsThunk()).then(() => setLoading(false));
    }, [dispatch]);

    return(
        <Container className={styles.maincontainer}>
            <div className={styles.pagetitle}>
                <span className={styles.title}>All posts:</span>
                <NavLink to="/post/addPost">
                    <Button className={styles.addpostbutton}>Add post</Button>
                </NavLink>
                </div>
            {loading ? (<span>Loading posts, please wait...</span>) : (
                <Row className={styles.rowcontainer}>
                    {posts.map(post => 
                        <Col key={post.id} xs={10} sm={5} md={5} lg={4} className={styles.card}>
                            <PostCard 
                                id={post.id}
                                postTitle={post.postTitle}
                                postAuthor={post.postAuthor}
                                postPublishedDate={post.postPublishedDate}
                                postShort={post.postShort}
                                postContent={post.postContent}
                            />
                        </Col>
                    )}    
                </Row>
            )}
        </Container>
    )
}

export default Main;
