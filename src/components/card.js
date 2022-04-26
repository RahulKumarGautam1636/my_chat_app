import React from 'react';
import ReplyCard from './replyCard.js';

const Card = (props) => {
  const replyTo = !props.comments.replyingTo ? "" : props.comments.replyingTo;
  return (
    <div className="card">
      <div className="voteBox">
      <img src="images/icon-plus.svg" alt="upvote" className="upvote" />
      <h5>{props.comments.score}</h5>
      <img src="images/icon-minus.svg" alt="downvote" className="downvote" />
      </div>
      <div className="commentBox">
      <div className="avatarBox">
        <div>
          <img className="avatar" src={props.comments.user.image.png} alt="avatar" />
          <h4 className="userName">{props.comments.user.username}</h4>
          <p>{props.comments.createdAt}</p>
        </div>
        <div className="replyBox">
          <img className="reply" src="images/icon-reply.svg" alt="reply" />
          <h4>Reply</h4>
        </div>
      </div>
      <div className="comment">
        <p><span><a href="/">{replyTo}</a></span> {props.comments.content}</p>
      </div>
    </div>
    </div>
  )
}

export default Card;
