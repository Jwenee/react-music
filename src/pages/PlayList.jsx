import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import BScroll from '@better-scroll/core';
import './PlayList.scss';

import SongList from '../components/SongList.jsx';
import {fetchPlayListDetail} from '../store/actionCreators';

function PlayList(props) {
  const { playListDetail, playListInfo, hasPlayed, dispatch } = props;
  const [bscroll, setBscroll] = useState(null);
  const scrollRef = useRef();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(fetchPlayListDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    if (bscroll) {
      return;
    }
    const scroll = new BScroll(scrollRef.current, {
      scrollY: true,
      click: true,
      probeType: 0
    });
    setBscroll(scroll);
  }, [bscroll])

  useEffect(() => {
    if (bscroll) {
      bscroll.refresh();
    }
  }, [bscroll, playListDetail, playListInfo, hasPlayed])


  return (
    <div className={classnames('remd-detail', {'has-bottom': hasPlayed})}>
      <div className="remd-scroll-wrapper" ref={scrollRef}>
        <div className="remd-scrollcontent">
          {playListInfo &&
          <div>
            <section className="playlst-head">
              <div className="plshead-bg">
                <img src={playListInfo.coverImgUrl} alt="" className="ubg-img"/>
              </div>
              <div className="plshead-wrap">
                <div className="plshead-fl">
                  <img src={playListInfo.coverImgUrl} alt="" className="u-img"/>
                  <i className="u-num">{Math.floor(playListInfo.playCount/10000)}万</i>
                </div>
                <div className="plshead-fr">
                  <h2 className="plshead-title">{playListInfo.name}</h2>
                  <div className="plshead-auth">
                    <div className="auth-info">
                      <div className="auth-avatar">
                        <img src={playListInfo.creator.avatarUrl} alt="" className="avatar-img"/>                        
                      </div>
                      {playListInfo.creator.nickname}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="pls-intro">
              <div className="u-intro">
                <div className="u-fthde">
                  {playListInfo.description}
                </div>
              </div>
            </section>
          </div>
          }
          <h3 className="song-detail-title">歌曲列表</h3>
          <SongList 
            songList={playListDetail}
          />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    playListDetail: state.playListDetail,
    playListInfo: state.playListInfo,
    hasPlayed: state.hasPlayed
  }
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlayList));