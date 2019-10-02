import React from 'react';
import { withRouter } from 'react-router-dom';
import './RecommendList.scss';

const RecommendItem = (props) => {
  const { remdItem } = props;

  const selectSongList = (id) => {
    props.history.push(`/playlist/${id}`)
  }
  return (
    <li className="remd-li" onClick={() => selectSongList(remdItem.id)}>
      <div className="remd-li-top">
        <img src={remdItem.picUrl} alt={remdItem.copywriter} className="remd-img"/>
        <span className="remd-extra">{Math.floor(remdItem.playCount/10000)}万</span>
      </div>
      <p className="remd-txt">{remdItem.name}</p>
    </li>
  )
}

function RecommendList(props) {
  const { recommendList, history } =  props;
  return (
    <ul className="remd-list">
      {
        recommendList.map(item => {
          return (
            <RecommendItem 
              remdItem={item}
              key={item.id}
              history={history}
            />
          )
        })
      }
    </ul>
  );
}

export default withRouter(RecommendList);