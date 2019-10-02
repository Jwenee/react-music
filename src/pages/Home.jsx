import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import BScroll from '@better-scroll/core';
import './Home.scss';

import BaseSlider from '../components/BaseSlider.jsx';
import RecommendList from '../components/RecommendList.jsx';
import SongList from '../components/SongList.jsx';

import {
  fetchBannerList,
  fetchRecommendList,
  fetchNewSongList,
  setPlaySongList
} from '../store/actionCreators';

function Home(props) {
  const { bannerList, recommendList, newSongList, hasPlayed, dispatch } = props;
  const [bscroll, setBscroll] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (bannerList.length > 0) {
      return;
    }
    dispatch(fetchBannerList());

  }, [bannerList, dispatch]);

  useEffect(() => {
    if (recommendList.length > 0) {
      return;
    }
    dispatch(fetchRecommendList());
  }, [recommendList, dispatch]);

  useEffect(() => {
    if (newSongList.length > 0) {
      return;
    }
    dispatch(fetchNewSongList());
    dispatch(setPlaySongList(newSongList));
  }, [newSongList, dispatch]);

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
  },[bscroll])
  
  useEffect(() => {
    if (bscroll) {
      bscroll.refresh();
    }
  }, [bscroll, recommendList, bannerList, newSongList, hasPlayed])

  return (
    <div className={classnames('home-page', {'has-bottom': hasPlayed})}>
      <div className="scroll-wrapper" ref={scrollRef}>
        <div className="scroll-content">
          <BaseSlider 
            bannerList={bannerList}
          />
          <h2 className="remd-title">推荐歌单</h2>
          <RecommendList 
            recommendList={recommendList}
          />
          <h2 className="newsong-title">新歌推荐</h2>
          <SongList 
            songList={newSongList}
          />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    bannerList: state.bannerList,
    recommendList: state.recommendList,
    newSongList: state.newSongList,
    hasPlayed: state.hasPlayed
  }
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);