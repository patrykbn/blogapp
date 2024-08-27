import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate} from 'react-router-dom';
import { getPostById, fetchPostsThunk, editPostThunk } from '../../../redux/postsRedux';
import styles from './EditPost.module.scss'
import { Button, Col, Container, Row } from 'react-bootstrap';
import TextInput from '../../common/TextInput/TextInput';
import TextArea from '../../common/TextArea/TextArea';
import CustomTextEditor from '../../common/CustomTextEditor/CustomTextEditor';

const EditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const post = useSelector(state => getPostById(state, id));
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [postShort, setPostShort] = useState('');
    const [postContent, setPostContent] = useState('');
    const handleSubmit = e => {
        console.log('handle submit works')
        e.preventDefault()
        setSubmitting(true);
        dispatch(editPostThunk({ id, title, author, publishedDate, postShort, postContent}))
            .then(() => {
                navigate(`/post/${ id }`);
            })
    }

    useEffect(() => {
        if (!post) {
            dispatch(fetchPostsThunk()).then(() => setLoading(false));
        } else {
            setTitle(post.postTitle); // Initialize title state with post's title
            setAuthor(post.postAuthor);
            setPublishedDate(post.postPublishedDate);
            setPostShort(post.postShort);
            setPostContent(post.postContent);
            setLoading(false);
        }
    }, [dispatch, id, post]);

    if (loading) {
        return (
            <Container className={styles.preload}>
                <Col className={styles.preloadcol} xs={10} sm={5} md={5} lg={4}>Loading post...</Col>
            </Container>
        )
    }

    if (submitting) {
        return (
            <Container className={styles.preload}>
                <Col className={styles.preloadcol} xs={10} sm={5} md={5} lg={4}>Submiting changes to post...</Col>
            </Container>
        )
    }

    if (!post) {
        return (
            <Container className={styles.preload}>
                <Col className={styles.preloadcol} xs={10} sm={5} md={5} lg={4}>Post not found</Col>
            </Container>
        )
    }

    return (
        <Container className={styles.editpostcontainer}>
            <Col xs={12} sm={7} md={6} lg={6} className={styles.editpostcontent}>
                <Row className={`${styles.posteditrows} ${styles.title}`}>
                    <div>Title:</div>
                    <TextInput value={title} onChange={e => setTitle(e.target.value)} className={styles.title}/>
                </Row>
                <Row className={`${styles.posteditrows} ${styles.author}`}>
                    <div>Author:</div>
                    <TextInput value={author} onChange={e => setAuthor(e.target.value)} className={styles.author}/>
                </Row>
                <Row className={`${styles.posteditrows} ${styles.date}`}>
                    <div>Published date:</div>
                    <TextInput value={publishedDate} onChange={e => setPublishedDate(e.target.value)} className={styles.date}/>
                </Row>
                <Row className={`${styles.posteditrows} ${styles.short}`}>
                    <div>Post short description:</div>
                    <TextArea value={postShort} onChange={e => setPostShort(e.target.value)} row={3} className={styles.short}/>
                </Row>
                <Row className={`${styles.posteditrows} ${styles.description}`} >
                    <div>Post main content:</div>
                    <CustomTextEditor value={postContent} onChange={(content) => setPostContent(content)} className={styles.description}/>
                </Row>
                <div className={styles.buttoncontainer}>
                        <Button className={styles.submiteditbutton} onClick={handleSubmit} disabled={submitting}>Submit changes...</Button> 
                </div>
            </Col>
        </Container>
    );
}

export default EditPost;
