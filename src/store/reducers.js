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

export default {
  bannerList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_BANNER_LIST:
        return payload;
      default:
        return state;
    }
  },
  recommendList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_RECOMMEND_LIST:
        return payload;
      default:
        return state;
    }
  },
  newSongList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_NEW_SONG_LIST:
        return payload;
      default:
        return state;
    }
  },
  playListDetail(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PLAY_LIST_DETAIL:
        return payload;
      default:
        return state;
    }
  },
  playSongList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PLAY_SONG_LIST:
        return payload;
      default:
        return state;
    }
  },
  hasPlayed(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_HAS_PLAYED:
        return payload;
      default:
        return state;
    }
  },
  fullScringPlaying(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_FULL_SCRING_PLAYING:
        return payload;
      default:
        return state;
    }
  },
  playModel(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PLAY_MODEL:
        return payload;
      default:
        return state;
    }
  },
  playIndex(state = -1, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PLAY_INDEX:
        return payload;
      default:
        return state;
    }
  },
  playId(state = -1, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PLAY_ID:
        return payload;
      default:
        return state;
    }
  },
  currentSong(state = {}, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_CURRENT_SONG:
        return payload;
      default:
        return state;
    }
  },
  currentSongUrl(state = '', action) {
    const { type, payload } = action;
    switch (type) {
      case SET_CURRENT_SONG_URL:
        return payload;
      default:
        return state;
    }
  },
  topSingerList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_TOP_SINGER_LIST:
        return payload;
      default:
        return state;
    }
  },
  singerInfo(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_SINGER_INFO:
        return payload;
      default:
        return state;
    }
  },
  singerSongList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_SINGER_SONG_LIST:
        return payload;
      default:
        return state;
    }
  },
  toastState(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_TOAST_STATE:
        return payload;
      default:
        return state;
    }
  },
  songUrlCanPlay(state = true, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_SONG_URL_CAN_PLAY:
        return payload;
      default:
        return state;
    }
  },
  officialRankList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_OFFICIAL_RANK_LIST:
        return payload;
      default:
        return state;
    }
  },
  otherRankList(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_OTHER_RANK_LIST:
        return payload;
      default:
        return state;
    }
  },
  playListInfo(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_PLAY_LIST_INFO:
        return payload;
      default:
        return state;
    }
  },

}