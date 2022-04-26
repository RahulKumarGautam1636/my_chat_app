import React, { useState, useEffect } from 'react';
// import myData from './data.json';




const InputBox = (props) => {
  const [comment, setComment] = useState("");
  // const [myData, setMyData] = useState();
  //
  // useEffect(() => {
  //   setMyData(props.data.comments);
  // },[])

  const handleForm = (e) => {
    e.preventDefault();
    const newComment = {
      "id": myData.length,
      "content": comment,
      "createdAt": "Just now",
      "score": 0,
      "user": {
        "image": {
          "png": "./images/avatars/image-juliusomo.png",
          "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      },
      "replies": []
    }
    setMyData({...myData, newComment});
  }
  console.log(myData);
  return (
      <form onSubmit={handleForm}>
        <img src={props.data.currentUser.image.png} alt="avatar" />
        <textarea onChange={e => setComment(e.target.value)} name="comment" placeholder="Add a comment..." rows="8" cols="80"></textarea>
        <button type="submit">SEND</button>
      </form>
  )
}


export default InputBox;
