import React from 'react';
import ReplyCard from './replyCard.js';
import Card from './card.js';
// import data from './data.json';


const Timeline = (props) => {

    return (
      <>
      { props.data.comments.map((c, index) => {
        return (
          <div key={index}>
            <Card comments={c}/>

            { c.replies.map((r, index) => {
              return (
                <div key={index}>
                  <ReplyCard comments={r}/>
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
