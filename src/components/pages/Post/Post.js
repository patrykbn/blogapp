import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { getPostById, fetchPostsThunk, deletePostThunk } from '../../../redux/postsRedux';
import styles from './Post.module.scss'
import { Button, Col, Container, Row, Modal } from 'react-bootstrap';

const Post = () => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post = useSelector(state => getPostById(state, id));
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDelete = () => {
        dispatch(deletePostThunk(id))
        .then(() => {
            navigate(`/`);
        })
    }

    useEffect(() => {
        if (!post) {
            dispatch(fetchPostsThunk()).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
        }, [dispatch, id, post]);
        
        if (loading) {
            return (
                <Container className={styles.postcontainer}><Col xs={10} sm={5} md={5} lg={4} >Loading post...</Col>
                </Container>
            )
        }

        if (!post) {
            return (
                <Container className={styles.postcontainer}><Col xs={10} sm={5} md={5} lg={4} >Post not found</Col>
                </Container>
            )
        }
    

    return (
        <Container className={styles.postcontainer}>
        <Col xs={12} sm={7} md={6} lg={6} className={styles.postcontent}>
            <Row className={styles.posttitlebar}>
                <div className={styles.title}><h1>{post.postTitle}</h1></div>
                <div className={styles.buttons}>
                    <NavLink to={`editPost`}>
                        <Button variant="outline-primary" className={styles.editpostbutton}>Edit</Button>
                    </NavLink>
                    <Button
                        variant="outline-danger"
                        className={styles.deletepostbutton}
                        onClick={() => setShowDeleteModal(true)}>
                        Delete
                    </Button>
                </div>
            </Row>
            <span><strong>Author:</strong> {post.postAuthor}</span>
            <span><strong>Date:</strong> {post.postPublishedDate}</span>
            <span><strong>Description:</strong></span>
            <p>{post.postShort}</p>
            <p dangerouslySetInnerHTML={{ __html: post.postContent }} />
        </Col>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Clicking confirm will ireversably remove this post. Are you sure you want to do this?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Post;
