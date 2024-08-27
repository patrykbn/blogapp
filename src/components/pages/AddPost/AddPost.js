import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPostThunk } from '../../../redux/postsRedux';
import styles from './AddPost.module.scss';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TextInput from '../../common/TextInput/TextInput';
import TextArea from '../../common/TextArea/TextArea';
import CustomTextEditor from '../../common/CustomTextEditor/CustomTextEditor';
import shortid from 'shortid';

const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [postShort, setPostShort] = useState('');
    const [postContent, setPostContent] = useState('');

    const handleAddPost = (e) => {
        e.preventDefault();
        setSubmitting(true);
        const id = shortid();
        dispatch(
            addPostThunk({
                id,
                postTitle: title,
                postAuthor: author,
                postPublishedDate: publishedDate,
                postShort,
                postContent,
            })
        )
        .then(() => {
            navigate(`/`);  // Navigate to the home page after adding the post
        })
        .catch((error) => {
            console.error('Error adding post:', error);
            setSubmitting(false);  // Reset submitting if there's an error
        });
    };

    if (submitting) {
        return (
            <Container className={styles.preload}>
                <Col className={styles.preloadcol} xs={10} sm={5} md={5} lg={4}>
                    Adding new post...
                </Col>
            </Container>
        );
    }

    return (
        <Container className={styles.editpostcontainer}>
            <Col xs={12} sm={7} md={6} lg={6} className={styles.editpostcontent}>
                <Row className={`${styles.posteditrows} ${styles.title}`}>
                    <div>Title:</div>
                    <TextInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.title}
                    />
                </Row>
                <Row className={`${styles.posteditrows} ${styles.author}`}>
                    <div>Author:</div>
                    <TextInput
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={styles.author}
                    />
                </Row>
                <Row className={`${styles.posteditrows} ${styles.date}`}>
                    <div>Published date:</div>
                    <TextInput
                        value={publishedDate}
                        onChange={(e) => setPublishedDate(e.target.value)}
                        className={styles.date}
                    />
                </Row>
                <Row className={`${styles.posteditrows} ${styles.short}`}>
                    <div>Post short description:</div>
                    <TextArea
                        value={postShort}
                        onChange={(e) => setPostShort(e.target.value)}
                        row={3}
                        className={styles.short}
                    />
                </Row>
                <Row className={`${styles.posteditrows} ${styles.description}`}>
                    <div>Post main content:</div>
                    <CustomTextEditor
                        value={postContent}
                        onChange={(content) => setPostContent(content)}
                        //className={styles.description}
                    />
                </Row>
                <div className={styles.buttoncontainer}>
                    <Button
                        className={styles.submiteditbutton}
                        onClick={handleAddPost}
                        disabled={submitting}
                    >
                        Add new post
                    </Button>
                </div>
            </Col>
        </Container>
    );
};

export default AddPost;
