import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BScroll from '@better-scroll/core';
import classnames from 'classnames';
import './TopRank.scss';

import { fetchRankList } from '../store/actionCreators';

function TopRank(props) {
  const { officialRankList, otherRankList, hasPlayed, dispatch } = props;
  const [bscroll, setBscroll] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (officialRankList.length > 0) {
      return;
    }
    dispatch(fetchRankList());
  }, [dispatch, officialRankList])

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
  }, [bscroll, officialRankList, otherRankList, hasPlayed])

  const selectSongList = (id) => {
    props.history.push(`/playlist/${id}`)
  };

  return (
    <div className={classnames('toprank-page', {'has-bottom': hasPlayed})}>
      <div className="scroll-wrapper" ref={scrollRef}>
        <div className="scroll-content">
          <h3 className="top-title">官方榜</h3>
          <ul>
            {officialRankList.length > 0 &&
              officialRankList.map(item => {
                return (
                  <li className="rank-item" key={item.id} onClick={() => selectSongList(item.id)}>
                      <div className="rank-left">
                        <img src={item.coverImgUrl} alt="" className="rank-image"/>
                        <p className="rank-des">{item.updateFrequency}</p>
                      </div>
                      <div className="rank-right">
                        <h3 className="rank-title">{item.name}</h3>
                        <ol>
                          {
                            item.tracks.map((song, index) => {
                              return (
                                <li className="song-rank" key={index}>
                                  <span className="song-rank-index">{index + 1}</span>
                                  <p className="song-rank-name">{song.first}-{song.second}</p>
                                </li>
                              )
                            })
                          }
                        </ol>
                      </div>
                  </li>
                )
              })
            }
          </ul>
          <h3 className="top-title">全球榜</h3>
          <ul className="other-rank-wrapper">
            {otherRankList.length > 0 &&
              otherRankList.map((item, index) => {
                return (
                  <li className="other-rank-item" key={index} onClick={() => selectSongList(item.id)}>
                    <img src={item.coverImgUrl} alt="" className="other-rank-image"/>
                    <p className="rank-des">{item.updateFrequency}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    officialRankList: state.officialRankList,
    otherRankList: state.otherRankList,
    hasPlayed: state.hasPlayed
  }
};
const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopRank));
