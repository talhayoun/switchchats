const axios = require('axios')

const apiHelper = {
  attachRoom(roomId) {
    axios.get('https://api.skippi.net/room?roomId=' + roomId).then(room => {
      console.log('room attached')
    })
  },
  leaveRoom(roomId) {
    axios.get('https://api.skippi.net/leave-room?roomId=' + roomId).then(room => {
      console.log('leave room')
    })
  },
  message(uid, msg, roomId) {
    axios.get('https://api.skippi.net/message?uid=' + uid + '&m=' + encodeURI(msg) + '&roomId=' + roomId).then(msg_ => {
      console.log('message sent')
    })
  }
}

export default apiHelper
