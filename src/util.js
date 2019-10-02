class Song{
  constructor(id, name, singers, al) {
    this.id = id
    this.name = name
    this.singers = singers
    this.al = al
  }
}

export function createSong(id = -1, name = '', singers = [], al = {}) {
  return new Song(
    id,
    name,
    singers,
    al
  )
}

export function leftZero(num) {
  return num > 9 ? num : `0${num}`
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 数组打乱
export function shuffle(arr) {
  let _arr = arr.slice() // 修改副本
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}