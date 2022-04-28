import React, { useState } from 'react';
import data from './data.json';
import './CSS/styles.css';


const App = () => {
  const [myData, setMyData] = useState(data.comments);

  return (
    <>
    <div>
    <Timeline myData={myData} setMyData={setMyData}/>
    <div id="mainInput">
    <InputBox myData={myData} setMyData={setMyData}/>
    </div>
    </div>
    <div className="attribution">
    <p>Challenge by - <span><a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.</span>
    Coded by - <span><a href="https://www.frontendmentor.io/profile/RahulKumarGautam1636">Rahul Kumar Gautam</a></span>.</p>
    </div>
    </>
  )
}

const InputBox = (props) => {
  const [comment, setComment] = useState('');

  const handleForm = (e) => {

    e.preventDefault();
    if (props.operationType === "edit") {
      let editedComment = props.myData.map(i => (i.id === Number(props.replyingToId) ? {...i, "content": comment} : i));
      props.setMyData(editedComment);
      setComment("");
      return;
    }

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
  const [replyTo, setReplyTo] = useState("");
  const [replyToId, setReplyId] = useState(null);


  const clickedReply = "input" + props.cardId;
  let operationType = "";
  const showInputField = (e) => {

    operationType = e.target.attributes.name.value;
    if (operationType === "delete") {
      console.log("delete")
      deleteComment();
      return;
    }

    const reply = document.querySelector('.' + clickedReply);
    reply.classList.toggle('hide');
    let replyingTo = "@" + e.target.attributes.name.value;
    let replyingToId = e.target.attributes.cardid.value;
    setReplyTo(replyingTo);
    setReplyId(replyingToId);

  }
  const deleteComment = () => {
    props.setMyData(preData => {
      return (
        preData.filter(item => item.id !== props.comments.id)
      )
    })
    // props.setMyData(preData => {
    //   return (
    //     preData.forEach((x, i) => {
    //       x.replies.forEach(item => {
    //         if (item.id===props.comments.id) {
    //           return preData[i].replies.filter(n => n.id !== props.comments.id)
    //         }
    //       })
    //     })
    //   )
    // })

  }

  const vote = (e) => {
    operationType = e.target.attributes.name.value;
    if (operationType === "upVote") {
      let upvote = props.myData.map(i => (i.id === Number(props.cardId) ? {...i, "score": i.score+1} : i));
      props.setMyData(upvote);
    } else if (operationType === "downVote") {
      let downvote = props.myData.map(i => (i.id === Number(props.cardId) ? {...i, "score": i.score-1} : i));
      props.setMyData(downvote);
    }
  }



  return (
    <>
    <div className="card">
      <div className="reply2">
      <div className="voteBox">
      <img onClick={vote} name="upVote" src="images/icon-plus.svg" alt="upvote" className="upvote" />
      <h5>{props.comments.score}</h5>
      <img onClick={vote} name="downVote" src="images/icon-minus.svg" alt="downvote" className="downvote" />
      </div>
      <div className="replyBox">
          <div>
            <img className="reply" src={"images/icon-" + (props.comments.user.username===data.currentUser.username ? "delete" : "reply") + ".svg"} alt="delete" />
            <h4 onClick={showInputField} name={props.comments.user.username===data.currentUser.username ? "delete" : "reply"} cardid={props.cardId}>{props.comments.user.username===data.currentUser.username ? "delete" : "reply"}</h4>
          </div>
          <div style={{display: props.comments.user.username===data.currentUser.username ? "flex" : "none"}}>
            <img className="reply" src="images/icon-edit.svg" alt="edit" />
            <h4 onClick={showInputField} name="edit" cardid={props.cardId}>Edit</h4>
          </div>
      </div>
      </div>
      <div className="commentBox">
      <div className="avatarBox">
        <div style={{width: props.comments.user.username!==data.currentUser.username ? "clamp(1rem, 68vw, 15.5rem)" : "18rem"}}>
          <img className="avatar" src={props.comments.user.image.png} alt="avatar" />
          <h4 className="userName">{props.comments.user.username}</h4>
          <h5 className="youTag" style={{display: props.comments.user.username===data.currentUser.username ? "block" : "none"}}>You</h5>
          <p className="createdAt">{props.comments.createdAt}</p>
        </div>
        <div className="replyBox">
            <div>
              <img className="reply" src={"images/icon-" + (props.comments.user.username===data.currentUser.username ? "delete" : "reply") + ".svg"} alt="delete" />
              <h4 onClick={showInputField} name={props.comments.user.username===data.currentUser.username ? "delete" : "reply"} cardid={props.cardId}>{props.comments.user.username===data.currentUser.username ? "delete" : "reply"}</h4>
            </div>
            <div style={{display: props.comments.user.username===data.currentUser.username ? "flex" : "none"}}>
              <img className="reply" src="images/icon-edit.svg" alt="edit" />
              <h4 onClick={showInputField} name="edit" cardid={props.cardId}>Edit</h4>
            </div>
        </div>
      </div>
      <div className="comment">
        <p><span><a href="/">{props.comments.replyingTo}</a></span> {props.comments.content}</p>
      </div>
    </div>
    </div>
    <div style={{display: "none"}} className={clickedReply}>
      <InputBox operationType={operationType} replyingTo={replyTo} replyingToId={replyToId} myData={props.myData} setMyData={props.setMyData}/>
    </div>
    </>
  )
}

export default App;
