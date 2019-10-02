import React from 'react';
import './BaseToast.scss';

function BaseToast(props) {
  const { 
    title,
    content,
    leftTxt,
    rightTxt,
    onClickLeft,
    onClickRight
  } = props
  
  return (
    <div className="dialog-mask">
      <div className="dialog-box">
        <div className="dialog-hd">
          <h4 className="dialog-title">{ title }</h4>
        </div>
        <div className="dialog-bd">
          <p className="dialog-content">{ content }</p>
        </div>
        <div className="dialog-ft">
          <div className="dialog-btn left" onClick={onClickLeft} >
          { leftTxt }
          </div>
          <div className="dialog-btn right" onClick={onClickRight} >
          { rightTxt }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseToast;