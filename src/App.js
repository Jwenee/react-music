import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './App.scss';

import { setToastState } from './store/actionCreators';

import BaseToast from './components/BaseToast.jsx';
import MusicPlay from './components/MusicPlay.jsx';
const Home = lazy(() => import('./pages/Home.jsx'));
const PlayList = lazy(() => import('./pages/PlayList.jsx'));
const SingerList = lazy(() => import('./pages/SingerList.jsx'));
const SingerDetail = lazy(() => import('./pages/SingerDetail.jsx'));
const TopRank = lazy(() => import('./pages/TopRank.jsx'));


function App(props) {
  const { hasPlayed, toastState, dispatch } = props
  const hanldeToastClick = () => {
    dispatch(setToastState(false))
  }

  return (
    <div className="app-container">
      <Router>
        <div className="nav-wrapper">
          <nav className="nav-container">
            <NavLink to="/home" className="nav-title" activeClassName="selected">
              <div className="nav-txt">
                <span className="txt">
                  <em className="txt-word">推荐音乐</em>
                </span>
              </div>
            </NavLink>
            <NavLink to="/singerlist" className="nav-title" activeClassName="selected">
              <div className="nav-txt">
                <span className="txt">
                  <em className="txt-word">推荐歌手</em>
                </span>
              </div>
            </NavLink>
            <NavLink to="/toprank" className="nav-title" activeClassName="selected">
              <div className="nav-txt">
                <span className="txt">
                  <em className="txt-word">排行榜</em>
                </span>
              </div>
            </NavLink>
          </nav>
        </div>
        <div className="page-container">
          <Suspense fallback={null}>
            <Route exact path="/" render={() =>(<Redirect to="/home"/>) } />
            <Route path="/home" component={Home}  />
            <Route path="/singerdetail/:id" component={SingerDetail} />
            <Route path="/singerlist" component={SingerList} />
            <Route path="/toprank" component={TopRank} />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <Route path="/playlist/:id" component={PlayList}  />
        </Suspense>
        { hasPlayed &&
          <MusicPlay />
        }
        { toastState &&
          <BaseToast 
            title="提示"
            content="歌曲暂无版权或仅限Vip播放，已为您播放下一首可用音乐"
            leftTxt="确定"
            rightTxt="取消"
            onClickLeft={hanldeToastClick}
            onClickRight={hanldeToastClick}
          />
        }
      </Router>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    hasPlayed: state.hasPlayed,
    toastState: state.toastState
  }
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

