import React from 'react';
import ReplyCard from './replyCard.js';
import Card from './card.js';
// import data from './data.json';


const Timeline = (props) => {
    return (
      <>
      { props.myData.map((c, x) => {
        return (
          <div key={x}>
          <Card cardindex={String(x)+","} user={c.user.username} cardId={c.id} myData={props.myData} setMyData={props.setMyData} comments={c}/>
          { c.replies.map((r, y) => {
            return (
              <div key={y}>
              <ReplyCard cardindex={String(x)+","+String(y)} user={c.user.username} cardId={r.id} myData={props.myData} setMyData={props.setMyData} comments={r}/>
              </div>
            )
          }) }
          </div>
        )
      }) }
      </>
    )
}

export default Timeline;
