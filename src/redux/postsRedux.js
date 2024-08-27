import shortid from 'shortid';
import { API_URL } from '../config';

//selectors
export const getAllPosts = ({ posts }) =>  posts;
export const getPostById = ( state, id) => {
    return state.posts.find(post => post.id === id)};

//action types
const createActionName = actionName => `app/posts/${actionName}`;
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const DELETE_POST = createActionName('DELETE_POST');
const FETCH_POSTS = createActionName('FETCH_POSTS');

//action creators
export const addPost = payload => ({ type: ADD_POST, payload });
export const editPost = payload => ({ type: EDIT_POST, payload });
export const deletePost = (postId) => ({ type: DELETE_POST, payload: postId });
export const fetchPosts = payload => ({ type: FETCH_POSTS, payload });

// thunk creator for fetching posts
export const fetchPostsThunk = () => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const data = await response.json();
        console.log('Fetched posts data:', data);
        dispatch(fetchPosts(data));
    } catch (error) {
        console.error('Error fatching posts:', error);
    }
};
//thunk creator for adding a post
export const addPostThunk = (post) => async dispatch => {
    const { id, postTitle, postAuthor, postPublishedDate, postShort, postContent } = post;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            postTitle,
            postAuthor,
            postPublishedDate,
            postShort,
            postContent,
        })
    };

    try {
        const response = await fetch(`${API_URL}/posts`, options);
        if (response.ok) {
            const newPost = await response.json();
            dispatch(addPost(newPost));
        } else {
            console.error('Failed to add post:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding post:', error);
    }
}
//thunk creator for editing a post
export const editPostThunk = (post) => async dispatch => {
    const { id, title, author, publishedDate, postShort, postContent } = post;
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id,
            postTitle: title,
            postAuthor: author,
            postPublishedDate: publishedDate,
            postShort,
            postContent,
        })
    };
    console.log('Edited post:', post);
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, options);
        if (response.ok) {
            const updatedPost = await response.json();
            dispatch(editPost(updatedPost));
        } else {
            console.error('Failed to update post:', response.statusText)
        }
    } catch (error) {
        console.error('Error updating post:', error);
    }
};
//thunk creator for deleting a post
export const deletePostThunk = (postId) => async dispatch => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        },
    }
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, options);
        if (response.ok) {
            const postToDelete = await response.json();
            dispatch(deletePost(postToDelete));
        } else {
            console.error('Failed to delete post:', response.statusText)
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

const postsReducer = ( statePart = [], action ) => {
    switch (action.type) {
        case ADD_POST:
            return [...statePart, { ...action.payload }]
        case EDIT_POST:
            return statePart.map(post =>
                post.id === action.payload.id ? { ...post, ...action.payload } : post
            );
        case DELETE_POST:
            return statePart.filter(post => post.id !== action.payload)
        case FETCH_POSTS:
            return [...action.payload]
        default:
            return statePart;
    }
};

export default postsReducer;