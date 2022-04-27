import React, { useState } from 'react';
import data from './data.json';
import './CSS/styles.css';


const App = () => {
  const [myData, setMyData] = useState(data.comments);

  return (
    <div>
    <Timeline myData={myData} setMyData={setMyData}/>
    <div id="mainInput">
    <InputBox myData={myData} setMyData={setMyData}/>
    </div>
    </div>
  )
}

const InputBox = (props) => {
  const [comment, setComment] = useState('');

  const handleForm = (e) => {

    e.preventDefault();
    const randomId = Math.floor(Math.random()*1000000);

    const newComment = {
      "id": randomId,
      "content": comment,
      "createdAt": "Just now",
      "score": 0,
      "replyingTo": props.replyingTo,
      "user": {
        "image": {
          "png": "./images/avatars/image-juliusomo.png",
          "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      },
      "replies": []
    }
    // console.log(props.replyingToId);
    // props.myData.find((x, i) => {
    //   if (x.id == props.replyingToId) {
    //     console.log(x);
    //     return;
    //   }
    //   console.log(x);
    // });
    for (var i=0; i<props.myData.length; i++) {
      // var matchItem = props.myData[i].replies.filter(r => r.id = props.replyingToId);

      if (props.myData[i].id === Number(props.replyingToId)) {                //---------------------------

      // let newData = props.myData.map(el => (
      //     el.id == props.replyingToId ? { ...el, [12]: newComment } : el
      // ));
      // props.setMyData(newData);

      // let newData = { ...props.myData[i].replies };
      // console.log(newData);
      let foundComment = i;
      props.setMyData(item => [...item, props.myData[foundComment].replies[props.myData[foundComment].replies.length] = {
      // props.setMyData(item => [...item, item[i].replies[item[i].replies.length] = {
      // props.setMyData(item => [...item, item[i].replies[item[i].replies.length] = {
        "id": randomId,
        "content": comment,
        "createdAt": "Just now",
        "score": 0,
        "replyingTo": props.replyingTo,
        "user": {
          "image": {
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
          },
          "username": "juliusomo"
        },
        "replies": []
      }]);

        props.setMyData(preData => {
          return (
            preData.filter((item) => {
              console.log(typeof(randomId));

              return item.id !== randomId;             // ------------------
            })
          )
        });
        setComment("");
        return;
      } else {
        for (var j=0; j<props.myData[i].replies.length; j++) {
          if (props.myData[i].replies[j].id === Number(props.replyingToId)) {
            let foundReply = i;
            props.setMyData(item => [...item, props.myData[foundReply].replies[props.myData[foundReply].replies.length] = {
              "id": randomId,
              "content": comment,
              "createdAt": "Just now",
              "score": 0,
              "replyingTo": props.replyingTo,
              "user": {
                "image": {
                  "png": "./images/avatars/image-juliusomo.png",
                  "webp": "./images/avatars/image-juliusomo.webp"
                },
                "username": "juliusomo"
              },
              "replies": []
            }]);

            props.setMyData(preData => {
              return (
                preData.filter((item) => {
                  return item.id !== randomId;
                })
              )
            });
            setComment("");
            return;
          }
        }
      }
    }
      props.setMyData(preData => [...preData, newComment]);

    setComment("");
  }
  return (
      <form onSubmit={handleForm}>
        <textarea onChange={e => setComment(e.target.value)} name="comment" value={comment} placeholder={props.replyingTo} rows="8" cols="80"></textarea>
          <div>
            <img src={data.currentUser.image.png} alt="avatar" />
            <textarea onChange={e => setComment(e.target.value)} name="comment" value={comment} placeholder={props.replyingTo} rows="8" cols="80"></textarea>
            <button type="submit">SEND</button>
          </div>
      </form>
  )
}

const Timeline = (props) => {
    return (
      <>
      { props.myData.map((c, index) => {
        return (
          <div key={index}>
          <Card user={c.user.username} cardId={c.id} myData={props.myData} setMyData={props.setMyData} comments={c}/>

          { c.replies.map((r, index) => {
            return (
              <div key={index}>
              <ReplyCard user={c.user.username} cardId={r.id} myData={props.myData} setMyData={props.setMyData} comments={r}/>
              </div>
            )
          }) }

          </div>
        )
      }) }
      </>
    )
}

const ReplyCard = (props) => {
  return (
    <div className="reply-card">
    <Card user={props.user} cardId={props.cardId} myData={props.myData} setMyData={props.setMyData} comments={props.comments}/>
    </div>
  )
}

const Card = (props) => {
  const [replyTo, setReplyTo] = useState('');
  const [replyToId, setReplyId] = useState(null);
  const clickedReply = "input" + props.cardId;
  const showInputField = (e) => {
  const reply = document.querySelector('.' + clickedReply);
  reply.classList.toggle('hide');
  let replyingTo = "@" + e.target.attributes.name.value;
  let replyingToId = e.target.attributes.cardid.value;
  setReplyTo(replyingTo);
  setReplyId(replyingToId);
}


  return (
    <>
    <div className="card">
      <div className="reply2">
      <div className="voteBox">
      <img src="images/icon-plus.svg" alt="upvote" className="upvote" />
      <h5>{props.comments.score}</h5>
      <img src="images/icon-minus.svg" alt="downvote" className="downvote" />
      </div>
      <div className="replyBox">
        <img className="reply" src="images/icon-reply.svg" alt="reply" />
        <h4 onClick={showInputField} name={props.comments.user.username} cardid={props.cardId}>Reply</h4>
      </div>
      </div>
      <div className="commentBox">
      <div className="avatarBox">
        <div>
          <img className="avatar" src={props.comments.user.image.png} alt="avatar" />
          <h4 className="userName">{props.comments.user.username}</h4>
          <p className="createdAt">{props.comments.createdAt}</p>
        </div>
        <div className="replyBox">
          <img className="reply" src="images/icon-reply.svg" alt="reply" />
          <h4 onClick={showInputField} name={props.comments.user.username} cardid={props.cardId}>Reply</h4>
        </div>
      </div>
      <div className="comment">
        <p><span><a href="/">{props.comments.replyingTo}</a></span> {props.comments.content}</p>
      </div>
    </div>
    </div>
    <div style={{display: "none"}} className={clickedReply}>
      <InputBox replyingTo={replyTo} replyingToId={replyToId} myData={props.myData} setMyData={props.setMyData}/>
    </div>
    </>
  )
}

export default App;
