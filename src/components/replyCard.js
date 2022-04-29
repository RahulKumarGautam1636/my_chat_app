import React from 'react';
import Card from './card.js';
//
const ReplyCard = (props) => {
  return (
    <div className="reply-card">
      <Card cardindex={props.cardindex} user={props.user} cardId={props.cardId} myData={props.myData} setMyData={props.setMyData} comments={props.comments}/>
    </div>
  )
}

export default ReplyCard;
