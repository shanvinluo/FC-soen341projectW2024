import React, { useState, useEffect } from 'react';
import '../styles/Comment.css';

const Comment = ({ vehicule_id }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5004/comments/${vehicule_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data); // Directly set the fetched array to comments
      } catch (error) {
        setError(error.message);
        console.error("Fetching comments failed:", error);
      } 
    };

    if (vehicule_id) {
      fetchComments();
    }
  }, [vehicule_id]);

  if (error) {
    return <div>Error fetching comments: {error}</div>;
  }


  return (
    <div className="comment-component">
      {comments.length > 0 ? (
        comments.map((comment, index) => ( // Using index as a key due to lack of id; consider adding unique ids for comments
          <div key={index} className="comment">
            {comment}
          </div>
        ))
      ) : (
        <div>No comments found.</div>
      )}
    </div>
  );
};

export default Comment;
