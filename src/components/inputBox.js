import React, { useState } from 'react';
import data from './data.json';




const InputBox = (props) => {
  const [comment, setComment] = useState();

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

    if (!props.cardindex) {
        props.setMyData(preData => [...preData, newComment]);
        setComment("");
        return;
    }
    let foundComment = !props.cardindex ? props.myData.length-1 : Number(props.cardindex.split(",")[0]);
    props.setMyData(item => [...item, props.myData[foundComment].replies[props.myData[foundComment].replies.length] = newComment ]);

    props.setMyData(preData => {             //new Item is added in mail list automatically hence removing last item every time
      return (                               // when we add new item in list.
        preData.filter((item) => {
          return item.id !== randomId;
        })
      )
    });
    setComment("");
}

  return (
      <form onSubmit={handleForm}>
        <textarea id={"inputField1_" + props.cardId} onChange={e => setComment(e.target.value)} name="comment" value={comment} placeholder={props.replyingTo} rows="8" cols="80"></textarea>
          <div>
            <img src={data.currentUser.image.png} alt="avatar" />
            <textarea id={"inputField2_" + props.cardId} onChange={e => setComment(e.target.value)} name="comment" value={comment} placeholder={props.replyingTo} rows="8" cols="80"></textarea>
            <button type="submit">SEND</button>
          </div>
      </form>
  )
}


export default InputBox;
