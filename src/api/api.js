const axios = require('axios')

const api = 'https://api.switchats.com'

const apiHelper = {
    attachRoom(roomId) {
        axios.get(`${api}/room?roomId=` + roomId).then(room => {
        })
    },
    leaveRoom(roomId) {
        axios.get(`${api}/leave-room?roomId=` + roomId).then(room => {
        })
    },
    message(uid, msg, roomId) {
        axios.get(`${api}/message?uid=` + uid + '&m=' + encodeURI(msg) + '&roomId=' + roomId).then(msg_ => {
        })
    },
    report(roomId, reportType, reportText) {
        axios.get(`${api}/report?type=` + reportType + '&text=' + reportText + '&' + 'roomId=' + roomId).then(msg_ => {
        })
    }
}

export default apiHelper
