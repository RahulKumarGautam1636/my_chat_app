import React, { useState } from 'react';
import data from './data.json';
import './CSS/styles.css';
import InputBox from './inputBox.js';
import Timeline from './timeline.js';


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

export default App;
