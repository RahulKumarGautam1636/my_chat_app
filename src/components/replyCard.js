import React from 'react';
import Card from './card.js';

const ReplyCard = (props) => {
  return (
    <div className="reply-card">
    <Card comments={props.comments}/>
    </div>
  )
}

export default ReplyCard;
