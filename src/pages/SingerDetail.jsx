import React, { Fragment, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import BScroll from '@better-scroll/core';
import './SingerDetail.scss';

import { fetchSingerInfo } from '../store/actionCreators';
import SongList from '../components/SongList.jsx';

function SingerDetail(props) {
  const { dispatch, singerInfo, singerSongList, hasPlayed } = props;
  const id = props.match.params.id;
  const [bscroll, setBscroll] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(fetchSingerInfo(id));
  }, [id, dispatch])

  useEffect(() => {
    if (bscroll) {
      return;
    }
    const scroll = new BScroll(scrollRef.current, {
      click: true,
      scrollY: true,
      probeType: 0
    });
    setBscroll(scroll);
  }, [bscroll])

  useEffect(() => {
    if(bscroll) {
      bscroll.refresh();
    }
  }, [bscroll, singerInfo, singerSongList, hasPlayed])

  return (
    <div className={classnames('singer-detail', {'has-bottom': hasPlayed})}>
      <div className="scroll-wrapper" ref={scrollRef}>
        <div className="scroll-content">
          {singerInfo &&
          <Fragment>
            <div className="singer-head">
              <img className="singer-image" src={singerInfo.picUrl} alt={singerInfo.name} />
              <p className="singer-name">
                {singerInfo.name}
                <span>{ singerInfo.alias.length > 0 ? (singerInfo.alias.toString()) : ''}</span>
              </p>
            </div>
            <section className="singer-desc">
              <div className="art-intro">
                <div className="art-brk thde3">
                  <span>
                    <i>{singerInfo.briefDesc}</i>
                  </span>                
                </div>
                
              </div>
            </section>
          </Fragment>
          }
          <div className="art-list">
            <h3 className="title">热门50单曲</h3>
            <SongList 
              songList={singerSongList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    singerInfo: state.singerInfo,
    singerSongList: state.singerSongList,
    fullScringPlaying: state.fullScringPlaying,
    hasPlayed: state.hasPlayed
  }
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingerDetail);