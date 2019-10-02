import React from 'react';
import { connect } from 'react-redux';
import './SongList.scss';

import {
  setHasPlayed,
  setPlayId,
  setPlayIndex,
  setCurrentSong,
  setFullScringPlaying,
  setPlaySongList,
} from '../store/actionCreators';


function SongList(props) {
  const { songList, dispatch, fullScringPlaying } = props;

  const songInfo = (song) => {
    const singerArr = [];
    const { name = ''} = song.al;
    song.singers.forEach(item => {
      singerArr.push(item.name)
    })
    return `${singerArr.join('/')} - ${name}`;
  }

  const selectSongPlay = (id, index) => {
    dispatch(setHasPlayed(true))
    dispatch(setFullScringPlaying(!fullScringPlaying))
    dispatch(setPlayId(id))
    dispatch(setPlayIndex(index))
    dispatch(setPlaySongList(songList))
    dispatch(setCurrentSong(songList[index]))
  }

  return (
    <ol>
      { songList.length > 0 &&
        songList.map((song, index) => {
          return (
            <li className="song-item" key={song.id} onClick={() => selectSongPlay(song.id, index)}>
              <div className="song-index">{index + 1}</div>
              <div className="song-info">
                <div className="info-left">
                  <div className="song-name thide">{song.name}</div>
                  <div className="song-singer thide">
                    { songInfo(song) }
                  </div>
                </div>
                <div className="info-right">
                  <span className="iconfont play">&#xe6a3;</span>
                </div>
              </div>
            </li>
          )
        })
      }
    </ol>
  );
}
const mapStateToProps = (state) => {
  return {
    fullScringPlaying: state.fullScringPlaying
  }
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);