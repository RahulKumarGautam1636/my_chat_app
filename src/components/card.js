import React, { useState } from 'react';
import data from './data.json';
import InputBox from './inputBox.js';

const Card = (props) => {
  const [replyTo, setReplyTo] = useState({replyToName: "", replyToId: null})
  const [operationType, setOperationType] = useState("");


  const clickedReply = "input" + props.cardId;
  const showInputField = (e) => {
    if (e.target.attributes.name.value.split(',')[0] === "delete") {
      deleteComment();
      return;
    }
    setOperationType(e.target.attributes.name.value.split(',')[0]);    // Set operationType here otherwise delete function will get delayed by one click.
    const reply = document.querySelector('.' + clickedReply);          // Because of using setOperationType because using setOperationType will stop the
    reply.classList.toggle('hide');                                    // the execution here and will start executing from top again.
    let replyingToId = e.target.attributes.cardid.value;
    let replyingTo = "@" + e.target.attributes.name.value.split(',')[1];
    if (e.target.attributes.name.value.split(',')[0] === "reply") {
      setReplyTo({replyToName: replyingTo, replyToId: replyingToId});
      // document.querySelector("#inputField1_"+props.cardId).value = replyingTo + " ";
      // document.querySelector("#inputField2_"+props.cardId).value = replyingTo + " ";
      return;
    } else if (e.target.attributes.name.value.split(',')[0] === "edit")
      setReplyTo({replyToName: "", replyToId: replyingToId});
      document.querySelector("#inputField1_"+props.cardId).value = props.comments.content + " ";
      document.querySelector("#inputField2_"+props.cardId).value = props.comments.content + " ";
  }
  const deleteComment = () => {
    props.setMyData(preData => {
      return (
        preData.filter(item => item.id !== props.comments.id)
      )
    })
  }

  const vote = (e) => {
    if (e.target.attributes.name.value === "upVote") {
      let upvote = props.myData.map(i => (i.id === Number(props.cardId) ? {...i, "score": i.score+1} : i));
      props.setMyData(upvote);
    } else if (e.target.attributes.name.value === "downVote") {
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
            <h4 onClick={showInputField} name={props.comments.user.username===data.currentUser.username ? "delete," + props.comments.user.username : "reply," + props.comments.user.username} cardid={props.cardId}>{props.comments.user.username===data.currentUser.username ? "delete" : "reply"}</h4>
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
              <h4 onClick={showInputField} name={props.comments.user.username===data.currentUser.username ? "delete," + props.comments.user.username : "reply," + props.comments.user.username} cardid={props.cardId}>{props.comments.user.username===data.currentUser.username ? "delete" : "reply"}</h4>
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
      <InputBox cardindex={props.cardindex} cardId={props.cardId} operationType={operationType} replyingTo={replyTo.replyToName} replyingToId={replyTo.replyToId} myData={props.myData} setMyData={props.setMyData}/>
    </div>
    </>
  )
}

export default Card;
