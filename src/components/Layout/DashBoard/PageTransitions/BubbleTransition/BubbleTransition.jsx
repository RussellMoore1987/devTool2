import React from 'react';
import './BubbleTransition.css';

export default function BubbleTransition() {
  // get random number, possibility of starting bubble at either of the four corners
  const randomNum = Math.floor(Math.random() * 5); // returns the number between one and four
  let startingPoint = '';
  switch (randomNum) {
    case 2: startingPoint = 'topRight'; break;
    case 3: startingPoint = 'bottomRight'; break;
    case 4: startingPoint = 'bottomLeft'; break;
    default: startingPoint = 'topLeft'; break;
  }

  // turn on animation 
  setTimeout(() => {
    document.querySelector('.bubbleTransition').classList.add('bubbleCircleAffect');
  }, 400);

  return (
    <div className={"bubbleTransition " + startingPoint}>
      <div className="bubbleCircle bubble1"></div>
      <div className="bubbleCircle bubble2"></div>
      <div className="bubbleCircle bubble3"></div>
      <div className="bubbleCircle bubble4"></div>
      <div className="bubbleCircle bubble5"></div>
    </div>
  )
}
