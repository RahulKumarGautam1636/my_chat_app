import React, { useState, useEffect } from 'react';
import data from './data.json';
// import InputBox from './inputBox.js';
import './CSS/styles.css';
// import Timeline from './timeline.js';

const App = () => {
  // const data = JSON.parse(JSON.stringify(jsonData));
  const [myData, setMyData] = useState(data.comments);
  // console.log(myData);
  function getData() {
    console.log(myData);
  }
  return (
    <div onClick={getData}>
    <Timeline myData={myData} setMyData={setMyData}/>
    <div id="mainInput">
    <InputBox myData={myData} setMyData={setMyData}/>
    </div>
    </div>
  )
}

const InputBox = (props) => {
  // const user = !props.user ? "" : "@" + props.user + " ";
  const [comment, setComment] = useState('');
  // const [isReplying, setIsReplying] = useState(false);

  // useEffect(() => {
  //   setComment(user);
  // })

  // function updateUser() {
  // }
  const handleForm = (e) => {
    // const clickedCard = props.myData.filter(i => i.id === props.clickedCardId);
    // const replyTo = !clickedCard[0].user.username ? "" : clickedCard[0].user.username;
    e.preventDefault();
    // console.log(props.replyingToId);
    const replyUser = !props.replyingTo ? "" : props.replyingTo;
    const randomId = Math.floor(Math.random()*1000000);
    // console.log(clickedCard);
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

      if (props.myData[i].id == props.replyingToId) {
        console.log(props.myData[i].id);

      // let newData = props.myData.map(el => (
      //     el.id == props.replyingToId ? { ...el, [12]: newComment } : el
      // ));
      // props.setMyData(newData);

      // let newData = { ...props.myData[i].replies };
      // console.log(newData);
      props.setMyData(item => [...item, props.myData[i].replies[props.myData[i].replies.length] = {
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
      // props.setMyData(props.myData);

        props.setMyData(preData => {
          return (
            preData.filter((item) => {
              console.log(item);
              // return { ...preData[i-1], [props.replyingTo]: newComment }
              return item.id != randomId;
            })
          )
        });
        setComment("");
        return;
        // break;
      } else {
        for (var j=0; j<props.myData[i].replies.length; j++) {
          if (props.myData[i].replies[j].id == props.replyingToId) {
            // console.log(props.myData[i].replies[j]);
            // console.log(i + " " + j);
            // console.log(props.myData[i])
            // console.log(props.myData[i].replies[j])
            //
            // let newData = { ...props.myData[i].replies };
            // console.log(newData);

            props.setMyData(item => [...item, props.myData[i].replies[props.myData[i].replies.length] = {
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
                  console.log(item);
                  // return { ...preData[i-1], [props.replyingTo]: newComment }
                  return item.id != randomId;
                })
              )
            });
            setComment("");
            return;

            // props.myData[i].replies[props.myData[i].replies.length] = {
            //   "id": Math.floor(Math.random()*1000000),
            //   "content": comment,
            //   "createdAt": "Just now",
            //   "score": 0,
            //   "replyingTo": props.replyingTo,
            //   "user": {
            //     "image": {
            //       "png": "./images/avatars/image-juliusomo.png",
            //       "webp": "./images/avatars/image-juliusomo.webp"
            //     },
            //     "username": "juliusomo"
            //   },
            //   "replies": []
            // };

            // break;
          }
        }
      }
    }


    // if (isReplying) {
      props.setMyData(preData => [...preData, newComment]);
    // }

    setComment("");
    console.log(props.myData);
  }
  return (
      <form onSubmit={handleForm}>
        <img src={data.currentUser.image.png} alt="avatar" />
        <textarea onChange={e => setComment(e.target.value)} name="comment" value={comment} placeholder={props.replyingTo} rows="8" cols="80"></textarea>
        <button type="submit">SEND</button>
      </form>
  )
}

const Timeline = (props) => {
  // console.log(props.myData);
    return (
      <>
      { props.myData.map((c, index) => {
        // console.log(c);
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
  // const replyTo = !props.comments.replyingTo ? "" : props.comments.replyingTo;
  // console.log(props.myData);
  // var replyingTo = "test";
  const clickedReply = "input" + props.cardId;
  // const clickedReply = "input" + props.cardId;
  const showInputField = (e) => {
  const reply = document.querySelector('.' + clickedReply);
  reply.classList.toggle('hide');
  let replyingTo = "@" + e.target.attributes.name.value;
  let replyingToId = e.target.attributes.cardid.value;
  setReplyTo(replyingTo);
  setReplyId(replyingToId);
  // replyingTo = !clickedCard ? "" : clickedCard[0].user.username;
}


  return (
    <>
    <div className="card">

      <div class="reply2">

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
