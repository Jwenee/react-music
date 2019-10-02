import axios from 'axios';
// 获取轮播列表
export function getBannerList(type = 0) {
  return axios.get(`/banner?type=${type}`);
}
// 获取每日推荐歌单列表
export function getRecommengList() {
  return axios.get('/personalized');
}
// 获取歌单详情列表
export function getPlayListDetail(id) {
  return axios.get(`/playlist/detail?id=${id}`)
}
// 获取推荐新音乐列表
export function getNewSongList() {
  return axios.get('/personalized/newsong');
}
// 获取歌曲详情
export function getSongDetail(songid) {
  return axios.get(`/song/detail?ids=${songid}`)
}
// 获取歌曲url
export function getSongUrl(songid) {
  return axios.get(`/song/url?id=${songid}`)
}

// 获取top歌手列表
export function getTopSingers() {
  return axios.get('/top/artists')
}
// 获取歌手详情
export function getSingerDetail(singerid) {
  return axios.get(`/artists?id=${singerid}`)
}

// 获取排行榜摘要
export function getTopRankList() {
  return axios.get('/toplist/detail')
}
