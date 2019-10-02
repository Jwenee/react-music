import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BScroll from '@better-scroll/core';
import './SingerList.scss';
import { fetchToSingerList } from '../store/actionCreators'

function SingerList(props) {
  const { topSingerList, hasPlayed, dispatch } = props;
  const [bscroll, setBscroll] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (topSingerList.length > 0) {
      return;
    }
    dispatch(fetchToSingerList());
  }, [topSingerList, dispatch])

  useEffect(() => {
    if (bscroll) {
      return;
    }
    const scroll = new BScroll(scrollRef.current, {
      click: true,
      probeType: 0,
      scrollY: true
    });
    setBscroll(scroll);
  }, [bscroll])

  useEffect(() => {
    if (bscroll) {
      bscroll.refresh();
    }
  }, [bscroll, topSingerList, hasPlayed])

  const selectSinger = (id) => {
    props.history.push(`/singerdetail/${id}`)
  };

  return (
    <div className={classnames('top-singer-page', {'has-bottom': hasPlayed})}>
      <div className="scroll-wrapper" ref={scrollRef}>
        <div className="scroll-content">
          <ul className="top-singers">
            {
              topSingerList.map(singer => {
                return (
                  <li className="singer-item" key={singer.id} onClick={()=> selectSinger(singer.id)}>
                    <div className="singer-avatar">
                      <img className="singer-image" src={singer.picUrl} alt="singer avatar"/>
                    </div>
                    <div className="singer-info">
                      <p className="singer-name">{singer.name}</p>
                      <span className="singer-albumsize">专辑<strong>{singer.albumSize}</strong></span>
                      <span className="singer-musicsize">歌曲<strong>{singer.musicSize}</strong></span>
                    </div>
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
    topSingerList: state.topSingerList,
    hasPlayed: state.hasPlayed
  }
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch } 
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingerList));