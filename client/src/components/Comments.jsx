import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER } from '../constants/constants';
import Avatar from './Avatar';
import "../styles/Comment.css";

const Comments = ({ blog, close }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const getAllComments = async () => {
            const res = await axios.get(`${SERVER}/blog/getBlogComments/${blog?._id}`, {
                withCredentials: true
            });
            if (res.data?.status === 200) {
                setComments(res.data?.comments);
            }
        };
        getAllComments();
    }, [blog]);

    const postComment = async () => {
        if (!comment.trim()) return; // Prevent posting empty comments
        const res = await axios.post(`${SERVER}/blog/comment/${blog?._id}`, {
            content: comment
        }, {
            withCredentials: true
        });

        if (res.data?.status === 201) {
            setComments([...comments, res.data?.comment]);
            setComment(''); // Clear the input field after posting
        }
    };

    return (
        <div className='commentContainer'>
            <div className='commentHeader'>
                <h3>Comments: {comments.length}</h3>
                <button className='closeButton' onClick={close}>X</button>
            </div>

            <div className='commentsList'>
                {comments.map((comment) => (
                    <div className='commentItem' key={comment._id}>
                        <Avatar user={comment.userDetails} />
                        <div className='commentContent'>
                          <p>{comment?.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='commentInputContainer'>
                <input 
                    type='text'
                    className='commentInput'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} 
                />
                <button className='submitButton' onClick={postComment}>Submit</button>
            </div>
        </div>
    );
};

export default Comments;
