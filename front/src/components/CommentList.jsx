import React from 'react';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => {
  if (comments.length === 0) return <p>Hələ şərh yoxdur.</p>;

  return (
    <div className={styles.commentContainer}>
      {comments.map(comment => (
        <div key={comment._id} className={styles.commentCard}>
          <div className={styles.commentHeader}>
            <span>{comment.user.username}</span>
            <span>{comment.rating} ⭐</span>
          </div>
          <p className={styles.commentContent}>{comment.content}</p>
          <small className={styles.commentDate}>{new Date(comment.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
