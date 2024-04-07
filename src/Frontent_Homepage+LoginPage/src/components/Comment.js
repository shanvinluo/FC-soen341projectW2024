import React from 'react';
import '../styles/Comment.css'; // Make sure to create a corresponding CSS file

const Comment = ({ carId }) => {
  // Assuming comments are passed as props, otherwise define them here
  const comments = [
    { id: 1,  text: 'This is the first comment!' },
    { id: 2,  text: 'This is the second comment!' },
    { id: 3,  text: 'Here is another one!' },
  ];

  return (
    <div className="comment-component">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
        "{comment.text}""
        </div>
      ))}
    </div>
  );
};

export default Comment;
