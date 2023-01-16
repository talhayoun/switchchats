const axios = require('axios')

const apiHelper = {
  attachRoom(roomId) {
    axios.get('http://127.0.0.1:8989/room?roomId=' + roomId).then(room => {
      console.log('room attached')
    })
  },
  leaveRoom(roomId) {
    axios.get('http://127.0.0.1:8989/leave-room?roomId=' + roomId).then(room => {
      console.log('leave room')
    })
  },
  message(uid, msg, roomId) {
    axios.get('http://127.0.0.1:8989/message?uid=' + uid + '&m=' + encodeURI(msg) + '&roomId=' + roomId).then(msg_ => {
      console.log('message sent')
    })
  },
  report(roomId, reportType, reportText) {
    axios.get('http://127.0.0.1:8989/report?type=' + reportType + '&text=' + reportText + '&' + 'roomId=' + roomId).then(msg_ => {
      console.log('user reported')
    })
  }
}

export default apiHelper
