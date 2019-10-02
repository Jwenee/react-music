import { createSong } from '../util'
import {
  getBannerList,
  getRecommengList,
  getNewSongList,
  getPlayListDetail,
  getSongDetail,
  getSongUrl,
  getTopSingers,
  getSingerDetail,
  getTopRankList
} from '../api/request.js'

import {
  SET_BANNER_LIST,
  SET_RECOMMEND_LIST,
  SET_NEW_SONG_LIST,
  SET_FULL_SCRING_PLAYING,
  SET_HAS_PLAYED,
  SET_PLAY_LIST_DETAIL,
  SET_PLAY_SONG_LIST,
  SET_PLAY_MODEL,
  SET_PLAY_INDEX,
  SET_PLAY_ID,
  SET_CURRENT_SONG,
  SET_CURRENT_SONG_URL,
  SET_TOP_SINGER_LIST,
  SET_SINGER_INFO,
  SET_SINGER_SONG_LIST,
  SET_TOAST_STATE,
  SET_SONG_URL_CAN_PLAY,
  SET_OFFICIAL_RANK_LIST,
  SET_OTHER_RANK_LIST,
  SET_PLAY_LIST_INFO
} from './actionTypes.js';

export function setBannerList(bannerList) {
  return {
    type: SET_BANNER_LIST,
    payload: bannerList
  };
}
export function fetchBannerList() {
  return (dispatch) => {
    getBannerList()
      .then(res => {
        const { banners = [] } = res.data;
        dispatch(setBannerList(banners));
      })
      .catch(err => {
        console.log('banner fail')
      })
  };
}


export function setRecommendList(recommendList) {
  return {
    type: SET_RECOMMEND_LIST,
    payload: recommendList
  };
}

export function fetchRecommendList() {
  return (dispatch) => {
    getRecommengList()
      .then(res => {
        const { result = [] } = res.data
        dispatch(setRecommendList(result));
      })
      .catch(err => {
        console.log('recommend fail');
      })
  }
}

export function setPlayListDetail(playListDetail) {
  return {
    type: SET_PLAY_LIST_DETAIL,
    payload: playListDetail
  }
}

export function setPlayListInfo(playListInfo) {
  return {
    type: SET_PLAY_LIST_INFO,
    payload: playListInfo
  }
}

export function fetchPlayListDetail(id) {
  return (dispatch) => {
    getPlayListDetail(id)
      .then(res => {
        const { playlist = {} } = res.data;
        const { tracks = [] } = playlist;
        const formatSongArr = [];
        tracks.forEach(item => {
          formatSongArr.push(createSong(item.id, item.name, item.ar, item.al))
        })
        dispatch(setPlayListDetail(formatSongArr))
        dispatch(setPlayListInfo(playlist))
      })
      .catch(err => {
        console.log('playlistdetail fail')
      })
  }
}

export function setNewSongList(newSongList) {
  return {
    type: SET_NEW_SONG_LIST,
    payload: newSongList
  };
}

export function fetchNewSongList() {
  return (dispatch) => {
    getNewSongList()
      .then(res => {
        const { result = [] } = res.data;
        const formatSongArr = [];
        result.forEach(item => {
          formatSongArr.push(createSong(item.song.id, item.song.name, item.song.artists, item.song.album));
        })
        dispatch(setNewSongList(formatSongArr));
      })
      .catch(err => {
        console.log('newsong fail')
      })
  }
}

export function setPlaySongList(playSongList) {
  return {
    type: SET_PLAY_SONG_LIST,
    payload: playSongList
  }
}

export function setHasPlayed(hasPlayed) {
  return {
    type: SET_HAS_PLAYED,
    payload: hasPlayed
  };
}

export function setFullScringPlaying(fullScringPlaying) {
  return {
    type: SET_FULL_SCRING_PLAYING,
    payload: fullScringPlaying
  };
}

export function setPlayModel(playModel) {
  return {
    type: SET_PLAY_MODEL,
    payload: playModel
  }
}

export function setPlayIndex(playIndex) {
  return {
    type: SET_PLAY_INDEX,
    payload: playIndex
  }
}

export function setPlayId(playId) {
  return {
    type: SET_PLAY_ID,
    payload: playId
  }
}

export function setCurrentSong(currentSong) {
  return {
    type: SET_CURRENT_SONG,
    payload: currentSong
  }
}

export function fetchCurrentSong(id) {
  return (dispatch) => {
    getSongDetail(id)
      .then(res => {
        const { songs = [] } = res.data
        dispatch(setCurrentSong(songs[0]))
      })
      .catch(err => {
        console.log('song detail fail')
      })
  }
}

export function setCurrentSongUrl(currentSongUrl) {
  return {
    type: SET_CURRENT_SONG_URL,
    payload: currentSongUrl
  }
}

export function setSongUrlCanPlay(songUrlCanPlay) {
  return {
    type: SET_SONG_URL_CAN_PLAY,
    payload: songUrlCanPlay
  }
}

export function fetchCurrentSongUrl(id) {
  return (dispatch) => {
    getSongUrl(id)
      .then(res => {
        const { data = [] } = res.data
        const { url } = data[0]
        const hasUrl = url ? true : false
        dispatch(setCurrentSongUrl(url))
        dispatch(setSongUrlCanPlay(hasUrl))
      })
      .catch(err => [
        console.log('song url fail')
      ])
  }
}

export function setTopSingerList(topSingerList) {
  return {
    type: SET_TOP_SINGER_LIST,
    payload: topSingerList
  }
}

export function fetchToSingerList() {
  return (dispatch) => {
    getTopSingers()
      .then(res => {
        const { artists = [] } = res.data
        dispatch(setTopSingerList(artists))
      })
      .catch(err => {
        console.log('top singers fail')
      })
  }
}

export function setSingerInfo(singerInfo) {
  return {
    type: SET_SINGER_INFO,
    payload: singerInfo
  }
}
export function setSingerSongList(singerSongList) {
  return {
    type: SET_SINGER_SONG_LIST,
    payload: singerSongList
  }
}

export function fetchSingerInfo(singid) {
  return (dispatch) => {
    getSingerDetail(singid)
      .then(res => {
        const { artist = {}, hotSongs = [] } = res.data
        dispatch(setSingerInfo(artist))
        const formatSongArr = [];
        hotSongs.forEach(item => {
          formatSongArr.push(createSong(item.id, item.name, item.ar, item.al));
        })
        dispatch(setSingerSongList(formatSongArr));

      })
      .catch(err => {
        console.log('singer info fail')
      })
  }
}

export function setToastState(toastSstate) {
  return {
    type: SET_TOAST_STATE,
    payload: toastSstate
  }
}

export function setOfficialRankList(officialRankList) {
  return {
    type: SET_OFFICIAL_RANK_LIST,
    payload: officialRankList
  }
}

export function setOtherRankList(otherRankList) {
  return {
    type: SET_OTHER_RANK_LIST,
    payload: otherRankList
  }
}

export function fetchRankList() {
  return (dispatch) => {
    getTopRankList()
      .then(res => {
        const { list=[] } = res.data
        const officialRankArr = list.filter(item => item.ToplistType ? true : false)
        const otherRankArr = list.filter(item => item.ToplistType ? false : true)
        dispatch(setOfficialRankList(officialRankArr))
        dispatch(setOtherRankList(otherRankArr))
      })
      .catch(err => {
        console.log('top rank fail')
      })
  }
}