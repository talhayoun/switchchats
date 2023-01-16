import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: '',
    readRules: false,
    home: {
      step: 0,
      rulesBottom: false,
      online: 0
    },
    emoji: {
      visible: false,
      loading: false,
      gifs: [],
      popularGifs: [],
      recentGifs: [],
      query: '',
      searchOffset: 0,
      activeTab: 'gifs'
    },
    chat: {
      loading: false,
      inQueue: false,
      message: '',
      messages: [],
      currentUser: null,
      typing: false,
      peer: null,
      peerTyping: false,
      room: null
    },
    window: {
      maxHeight: null
    },
    roomId: '',

    reportType: '',
    reportText: ''
  },
  mutations: {
    setReportType (state, reportType) {
      state.reportType = reportType
    },
    setReportText (state, reportText) {
      state.reportText = reportText
    },
    setRoomId (state, roomId) {
      state.roomId = roomId
    },
    setNickname (state, payload) {
      state.nickname = payload.nickname
    },
    readRules (state, payload) {
      state.readRules = payload.readRules
    },
    setStep (state, payload) {
      state.home.step = payload
    },
    setOnline (state, payload) {
      state.home.online = payload
    },
    increaseStep (state) {
      state.home.step = state.home.step + 1
    },
    setRulesBottom (state, payload) {
      state.home.rulesBottom = payload
    },
    setEmojiLoading (state, payload) {
      state.emoji.loading = payload
    },
    setPopularGifs (state, payload) {
      state.emoji.popularGifs = payload
    },
    setRecentGifs (state, payload) {
      state.emoji.recentGifs = payload
    },
    setGifs (state, payload) {
      state.emoji.gifs = [...state.emoji.gifs, ...payload]
    },
    clearGifs (state) {
      state.emoji.gifs = []
    },
    setSearchGifQuery (state, payload) {
      state.emoji.query = payload
    },
    setSearchOffset (state, payload) {
      state.emoji.searchOffset = payload
    },
    setEmojiVisibility (state, payload) {
      state.emoji.visible = payload
    },
    setChatLoading (state, payload) {
      state.chat.loading = payload
    },
    setChatQueue (state, payload) {
      state.chat.inQueue = payload
    },
    setChatPeer (state, payload) {
      state.chat.peer = payload
    },
    setPeerTypingStatus (state, payload) {
      state.chat.peerTyping = payload
    },
    setChatRoom (state, payload) {
      state.chat.room = payload
    },
    addMessage (state, payload) {
      state.chat.messages = [...state.chat.messages, payload]
    },
    setMessage (state, payload) {
      state.chat.message = payload
    },
    setCurrentUser (state, payload) {
      state.chat.currentUser = payload
    },
    setTypingStatus (state, payload) {
      state.chat.typing = payload
    },
    clearChat (state, payload) {
      state.chat.loading = false
      state.chat.inQueue = false
      state.chat.message = ''
      state.chat.messages = []
      state.chat.peer = null
      state.chat.room = null
    },
    setWindowMaxHeight (state, payload) {
      state.window.maxHeight = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
