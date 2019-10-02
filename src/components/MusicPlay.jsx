import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import './MusicPlay.scss';
import { shuffle } from '../util';
import {
  setFullScringPlaying,
  fetchCurrentSongUrl,
  setPlayModel,
  setPlayIndex,
  setPlayId,
  setCurrentSong,
  setPlaySongList,
  setToastState,
} from '../store/actionCreators';


function MusicPlay(props) {
  const { 
    hasPlayed, 
    fullScringPlaying,
    playSongList,
    playId,
    playIndex,
    playModel,
    currentSong,
    currentSongUrl,
    songUrlCanPlay,
    dispatch
  } = props
  const [canplayed, setCanplayed] = useState(false)
  const [playTime, setPlayTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [percentValue, setPercentValue] = useState(-2)
  const audioRef = useRef()
  const progressParenNode = useRef()
  const progressParentWidth = useRef()
  const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
  }
  const songName = currentSong.name || ''
  const singerName = []
  currentSong.singers.forEach(item => {
    singerName.push(item.name)
  })
  const songImage = currentSong.al.picUrl || ''
  // 获取滑块父元素width
  useEffect(() => {
    if (!fullScringPlaying) {
      return;
    }
    progressParentWidth.current = parseFloat(
      window.getComputedStyle(progressParenNode.current).width
    )
  })
  // 请求歌曲url
  useEffect(() => {
    dispatch(fetchCurrentSongUrl(playId))
  }, [playId, dispatch])

  const leftZero = (num) => {
    return num > 9 ? num : `0${num}`
  }
  const timeFormat = (interval) => {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = leftZero(interval % 60)
    return `${minute}:${second}`
  }

  const canplaySong = () => {
    setCanplayed(true);
    setTotalTime(audioRef.current.duration)
    if (hasPlayed) {
      audioRef.current.play()
      setPlaying(true)
      if (!currentSongUrl) {
        nextSong()
      }
    }
  }
  const timeupdateSong = () => {
    setPlayTime(audioRef.current.currentTime)
    const percent = (audioRef.current.currentTime / totalTime).toFixed(2)
    setPercentValue(percent * 100)
  }
  const playError = () => {
    if (currentSongUrl === '') {
      return
    }
    nextSong()
  }
  const playEnded = () => {
    audioRef.current.currentTime = 0
    if (playModel === playMode.random) {
      const songList = shuffle(playSongList)
      let insertIndex = songList.findIndex(item => item.id === playId)
      if (insertIndex === songList.length - 1) {
        insertIndex = 0
      }
      insertIndex += 1
      dispatch(setPlaySongList(songList))
      dispatch(setPlayIndex(insertIndex))
      dispatch(setCurrentSong(playSongList[insertIndex]))
      dispatch(setPlayId(playSongList[insertIndex].id))
    }
    playModel === playMode.loop ? loopSong() : nextSong()
  }
  const changeModel = () => {
    const mode = (playModel + 1) % 3
    dispatch(setPlayModel(mode))
  }
  const prevSong = () => {
    if (playModel === playMode.loop) {
      return;
    }
    if (playSongList.length === 1) {
      loopSong()
      return
    } else {
      let index = playIndex - 1
      if (index < 0) {
        index = playSongList.length - 1
      }
      dispatch(setPlayIndex(index))
      dispatch(setCurrentSong(playSongList[index]))
      dispatch(setPlayId(playSongList[index].id))
    }
  }
  
  const nextSong = useCallback(() => {
    if (playModel === playMode.loop) {
      return;
    }
    if (playSongList.length === 1) {
      loopSong()
      return
    } else {
      let index = playIndex + 1
      if ( index === playSongList.length) {
        index = 0
      }
      dispatch(setPlayIndex(index))
      dispatch(setCurrentSong(playSongList[index]))
      dispatch(setPlayId(playSongList[index].id))
    }
  },[playModel, playSongList, dispatch, playIndex, playMode.loop])
  const loopSong = () => {
    audioRef.current.currentTime = 0
  }
  const playSong = () => {
    if (!canplayed) {
      return;
    }
    audioRef.current.play()
    setPlaying(!playing)
  }
  const pauseSong = () => {
    audioRef.current.pause()
    setPlaying(!playing)
  }

  const playModelIcon = () => {
    switch (playModel) {
      case 0:
        return {__html: '&#xe69d;'}
      case 1:
        return {__html: '&#xe6a1;'}
      case 2:
        return {__html: '&#xe6a4;'}
      default:
        return {__html: '&#xe69d;'}
    }
  }
  const showFullPlayer = () => {
    dispatch(setFullScringPlaying(!fullScringPlaying))
  }
  const hideFullPlayer = () => {
    dispatch(setFullScringPlaying(!fullScringPlaying))
  }

  // 歌曲不可用时提示并进行下一首播放
  useEffect(() => {
    if (!songUrlCanPlay) {
      dispatch(setToastState(true))
      nextSong()
    }
  }, [songUrlCanPlay, dispatch, nextSong])


  return (
    <Fragment>
      {fullScringPlaying &&
      <div className="full-play">
        <div className="background">
          <img src={ songImage } alt="" width="100%" height="100%"/>
        </div>
        <div className="play-top">
          <div className="close" onClick={hideFullPlayer}>
            <span className="iconfont">&#xe6a5;</span>
          </div>
          <p className="play-song-name">{ songName }</p>
        </div>
        <p className="play-song-singer">{ singerName.toString() }</p>
        <div className="play-middle">
          <div className="cd-wrapper">
            <div className={classnames('cd', { play: playing }, { pause: !playing }, { play: !playing })}>
              <img src={ songImage } alt="" className="cd-image"/>
            </div>
          </div>
        </div>
        
        <div className="progress-wrapper">
          <span className="time time-left">{ timeFormat(playTime) }</span>
          <div className="progress" ref={progressParenNode}>
            <div className="progress-over" style={{width: percentValue + '%'}}></div>
            <div className="progress-radius" style={{left: percentValue - 2 + '%'}}></div>
          </div>
          <span className="time time-right">{ timeFormat(totalTime) }</span>
        </div>
        <div className="control-wrapper">
          <div className="icon model" onClick={changeModel}>
            <span className="iconfont" dangerouslySetInnerHTML={playModelIcon()}></span>
          </div>
          <div className="icon prev" onClick={prevSong}>
            <span className="iconfont">&#xe6a0;</span>
          </div>
          { !playing &&
          <div className="icon play" onClick={playSong}>
            <span className="iconfont">&#xe6a3;</span>
          </div>
          }
          { playing &&
          <div className="icon pause" onClick={pauseSong}>
            <span className="iconfont">&#xe69f;</span>
          </div>
          }
          <div className="icon next" onClick={nextSong}>
            <span className="iconfont">&#xe69e;</span>
          </div>
        </div>
        
      </div>
      }
      { !fullScringPlaying &&
      <div className="mini-play">
        <div className="song-image" onClick={showFullPlayer}>
          <img 
            className={classnames('image', { play: playing }, { pause: !playing }, { play: !playing })} 
            src={ songImage } alt="song"
          />
        </div>
        <div className="mini-right">
          <div className="song-info" onClick={showFullPlayer}>
            <p className="song-name">{ songName }</p>
            <p className="song-singer">{ singerName.toString() }</p>
          </div>
          <div className="control-icon">
            { !playing &&
            <div className="icon play" onClick={playSong}>
              <span className="iconfont">&#xe6a3;</span>
            </div>
            }
            { playing &&
            <div className="icon pause" onClick={pauseSong}>
              <span className="iconfont">&#xe69f;</span>
            </div>
            }
          </div>
        </div>
      </div>
      }
      <audio 
        src={currentSongUrl}
        ref={audioRef}
        onError={playError}
        onCanPlay={canplaySong}
        onEnded={playEnded}
        onTimeUpdate={timeupdateSong}
      >
      </audio>

    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    hasPlayed: state.hasPlayed, 
    fullScringPlaying: state.fullScringPlaying,
    playSongList: state.playSongList,
    playSequenceList: state.playSequenceList,
    playId: state.playId,
    currentSong: state.currentSong,
    currentSongUrl: state.currentSongUrl,
    playIndex: state.playIndex,
    playModel: state.playModel,
    songUrlCanPlay: state.songUrlCanPlay
  }
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch}
}
export default connect(mapStateToProps, mapDispatchToProps)(MusicPlay);
