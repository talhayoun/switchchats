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
  },
  report(roomId, reportType, reportText) {
    axios.get('https://api.skippi.net/report?type=' + reportType + '&text=' + reportText + '&' + 'roomId=' + roomId).then(msg_ => {
      console.log('user reported')
    })
  }
}

export default apiHelper
