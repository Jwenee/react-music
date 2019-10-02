import React from 'react';
import './Loading.scss';

function Loading(props) {
  return (
    <div className="self-building-square-spinner">
      <div className="square"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square clear"></div>
      <div className="square"></div>
      <div className="square"></div>
      <div className="square clear"></div>
      <div className="square"></div>
      <div className="square"></div>
    </div>
  )
}

export default Loading;