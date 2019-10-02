import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers.js';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);
// 播放模式
const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}

const preloadedState = {
  bannerList: [], // 轮播列表
  recommendList: [], //推荐歌单列表
  playListInfo: null, // 歌单创建信息
  newSongList: [], // 推荐新歌列表
  playListDetail: [], // 推荐歌单详情列表
  playSongList: [], // 歌曲播放列表
  playIndex: -1, // 播放索引
  playId: -1, // 播放歌曲id
  currentSong: {}, //当前播放歌曲
  currentSongUrl: '', //当前播放歌曲url
  songUrlCanPlay: true, // 歌曲是否可用
  hasPlayed: false, // 是否播放过
  fullScringPlaying: false, // 是否全屏播放
  playModel: playMode.sequence, // 播放模式
  topSingerList: [], //热门歌手列表  
  singerInfo: null, // 歌手信息
  singerSongList: [], // 歌手歌曲列表
  toastState: false, // 提示框显示隐藏
  officialRankList: [], // 官方榜
  otherRankList: [], // 其他榜单
};

const store = createStore(
  combineReducers(reducers),
  preloadedState,
  enhancer
)

export default store;