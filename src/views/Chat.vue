<template>
  <div v-if="$store.state.chat.loading || $store.state.chat.inQueue" class="loading-container">
    <LoadingCircle />
    <p v-show="!$store.state.chat.loading && $store.state.chat.inQueue" class="loading-text">רק שניה, אנחנו מחפשים לך שותף/ה לשיחה :)</p>
    <p v-show="$store.state.chat.loading" class="loading-text">חיבור ...</p>
  </div>

  <div v-else class="card messenger">
    <div class="card-navigation">
      <a class="card-navigation-item card-navigation-item__left" href="#" @click="goToHome">&lsaquo; בית</a>
      <a class="card-navigation-item card-navigation-item__right" href="#" @click="reportFake">דווח</a>

      <template v-if="showModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h3>דיווח</h3>
              </div>

              <div class="modal-body" dir="rtl">
                <h3 class="why">מדוע ברצונך לדווח על השותף שלך לשיחה?</h3>
                <form>
                  <input type="radio" id="one" name="bla" value="One" @click="$store.commit('setReportType', 'התחזות')" />
                  <label for="one">התחזה לבן אדם אחר</label>
                  <br />
                  <input type="radio" id="two" name="bla" value="Two" @click="$store.commit('setReportType', 'איום')" />
                  <label for="two">פגע בי מילולית או שאיים לפגוע בי פיזית</label>
                  <br />
                  <input type="radio" id="three" name="bla" value="Two" @click="$store.commit('setReportType', 'אחר')" />
                  <label for="two">אחר</label>
                  <br /><br />
                  <span class="why"
                    >אנא פרט את סיבת הדיווח, כמו מדוע זה קרה, האם האדם הזה יודע
                    עליך</span
                  >
                  <br />
                  <textarea  @input="$store.commit('setReportText', $event.target.value)"></textarea>
                  <br />
                </form>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <h4 class="attention">
                    שים לב - דיווחים אשר ימצאו שיקריים, יועברו למחלקת החקירות וטיפול
                    המשטרה
                  </h4>
                  <button class="modal-default-button" @click="reportFakeAction">
                    שלח דיווח
                  </button>
                  <button class="modal-second-button" @click="showModal = false">
                    סגור
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="messenger-header">
      <div class="messenger-header-container">
        <div v-if="$store.state.chat.loading || $store.state.chat.inQueue" class="messenger-header-status">
          <p v-show="$store.state.chat.loading">{{'חיבור ...'}}</p>
          <p v-show="!$store.state.chat.loading && $store.state.chat.inQueue">{{'חיפוש בן שיח'}}</p>
        </div>
        <template v-else>
          <div class="messenger-header-subject">
            <div class="messenger-header-subject-avatar">
              <img :src="$store.state.chat.currentUser && $store.state.chat.currentUser.avatarUrl" alt="" />
            </div>
            <div class="messenger-header-subject-info">
              <h4 class="messenger-header-subject-name">{{$store.state.chat.currentUser && $store.state.chat.currentUser.nickname}}</h4>
              <p class="messenger-header-subject-status">{{'מחובר/ת'}}</p>
            </div>
          </div>

          <div class="messenger-header-action">
            <button @click="handleLeave">
              Switch
            </button>
          </div>

          <div class="messenger-header-companion">
            <div class="messenger-header-companion-info">
              <h4 class="messenger-header-companion-name">{{$store.state.chat.peer && $store.state.chat.peer.nickname}}</h4>
              <p class="messenger-header-companion-status">
                {{$store.state.chat.peerTyping ? 'מקליד/ה' : 'מחובר/ת'}}
              </p>
            </div>
            <div class="messenger-header-companion-avatar">
              <img :src="$store.state.chat.peer && $store.state.chat.peer.avatarUrl" alt="" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="messenger-content">
      <div class="messenger-content-container">
        <div class="messenger-content-status">
          <p v-if="$store.state.chat.inQueue || $store.state.chat.loading">{{'חכה עד שנמצא בן שיח ראוי עבורך :)'}}</p>
          <p v-else>{{ `אתה מצ’וטט כרגע עם “${$store.state.chat.peer && $store.state.chat.peer.nickname}” בצאט מאובטח`}}</p>
        </div>
        <!-- Messages -->
        <div class="messenger-content-list" ref="chatScroll">
            <message
              v-for="(message, index) in $store.state.chat.messages"
              :key="index"
              :message="message"
              :imgOnLoad="handleGifLoad"
              :ownerId="$store.state.chat.currentUser.id"
            />
        </div>
        <!-- End of Messages -->
        <!-- Messenger Box -->
        <div class="messenger-content-input">
          <form ref="chatForm" @submit="handleSubmit">
            <div class="form-group">
              <input
                type="text"
                placeholder="הקלד כאן..."
                v-model="message"
                @focus="chatInputFocus"
                @blur="chatInputBlur"
                @click="chatInputClick"
                @keyup="chatInputKeyUp"
                ref="chatInput"
              />
            </div>
            <button
              class="button button__primary messenger-content-input-button__send"
              type="submit"
              @mousedown="handleButtonSubmit"
            >
              <i class="icon icon-chevron__left"></i>
            </button>

            <button
              :class="$store.state.emoji.visible ? 'messenger-content-input-button__emoji messenger-content-input-button__emoji__active' : 'messenger-content-input-button__emoji'"
              @click="openEmojiBox"
            >
              <i class="icon icon-emoji"></i>
            </button>

            <!-- Emoji box -->
            <transition name="fade">
              <div v-show="$store.state.emoji.visible" class="messenger-content-emoji-box">
                <div class="messenger-content-emoji-box-container">
                  <div v-show="$store.state.emoji.activeTab === 'gifs'" class="messenger-content-emoji-box-search">
                    <input type="text" placeholder="חיפוש GIPHY" v-model="searchGifQuery" />
                  </div>

                  <div v-show="$store.state.emoji.activeTab === 'gifs'" class="messenger-content-emoji-box-content">
                    <p v-show="$store.state.emoji.loading" class="messenger-content-emoji-box-content-message">חכה רגע...</p>

                    <div
                      v-show="!$store.state.emoji.loading && $store.state.emoji.gifs.length > 0"
                      class="messenger-content-emoji-box-content-results"
                      @scroll="handleScroll"
                    >
                      <a
                        v-for="(gif, index) in $store.state.emoji.gifs"
                        :key="index"
                        class="messenger-content-emoji-box-content-results-item"
                        href="#"
                        @click="handleSendGif(gif, $event)"
                      >
                        <img :src="gif.fixed_height" :alt="`GIPHY GIF ${gif.id}`" />
                      </a>
                    </div>

                    <div
                      v-show="!$store.state.emoji.loading && $store.state.emoji.popularGifs.length > 0 && $store.state.emoji.recentGifs.length === 0 && $store.state.emoji.gifs.length === 0"
                      class="messenger-content-emoji-box-content-results"
                    >
                      <a
                        v-for="(gif, index) in $store.state.emoji.popularGifs"
                        :key="index"
                        class="messenger-content-emoji-box-content-results-item"
                        href="#"
                        @click="handleSendGif(gif, $event)"
                      >
                        <img :src="gif.fixed_height" :alt="`GIPHY GIF ${gif.id}`" />
                      </a>
                    </div>

                    <div
                      v-show="!$store.state.emoji.loading && $store.state.emoji.recentGifs.length > 0 && $store.state.emoji.gifs.length === 0"
                      class="messenger-content-emoji-box-content-results"
                    >
                      <p class="messenger-content-emoji-box-content-text">GIFs שהשתמשו לאחרונה</p>
                      <a
                        v-for="(gif, index) in $store.state.emoji.recentGifs"
                        :key="index"
                        class="messenger-content-emoji-box-content-results-item"
                        href="#"
                        @click="handleSendGif(gif, $event)"
                      >
                        <img :src="gif.fixed_height" :alt="`GIPHY GIF ${gif.id}`" />
                      </a>
                    </div>
                  </div>

                  <div class="messenger-content-emoji-box-tabs">
                    <a
                      class="messenger-content-emoji-box-tabs-item messenger-content-emoji-box-tabs-item__active"
                      href="#"
                    >GIFs</a>
                  </div>
                </div>
              </div>
            </transition>
            <!-- End of Emoji Box -->
          </form>
        </div>
        <!-- End of Messenger Box -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import * as _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import apiHelper from '@/helpers/apiHelper'

import Message from '@/components/Message.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
// import ModalReport from '@/components/modalReport.vue'

let socket = null
let typingTimeout = null

export default {
  data () {
    return {
      showModal: false
    }
  },
  created: function () {
    const recentGifs = JSON.parse(localStorage.getItem('recent_gifs'))
    let userId = null

    if (localStorage.getItem('uid')) {
      userId = localStorage.getItem('uid')
    } else {
      userId = uuidv4()
      localStorage.setItem('uid', userId)
    }

    if (recentGifs) {
      this.$store.commit('setRecentGifs', recentGifs)
    }

    this.$store.commit('setChatLoading', true)

    // socket = socketIOClient(window.location.origin.replace(/^http/, 'ws'))
    socket = socketIOClient('ws://127.0.0.1:8989')

    socket.on('connect', () => {
      console.log('[WS] Connected')

      const newUser = {
        id: userId,
        nickname: this.$store.state.nickname
      }

      socket.emit('join', newUser)
    }, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      forceNew: true
    })

    socket.on('joined', payload => {
      this.$store.commit('setCurrentUser', payload)
      this.$store.commit('setChatLoading', false)
      this.$store.commit('setChatQueue', true)
    })

    socket.on('chatStart', payload => {
      apiHelper.attachRoom(payload.room)
      this.$store.commit('setRoomId', payload.room)
      this.$store.commit('clearChat')
      this.$store.commit('setChatQueue', false)
      this.$store.commit('setChatPeer', payload.user)
      this.$store.commit('setChatRoom', payload.room)
    })

    socket.on('chatEnd', () => {
      apiHelper.leaveRoom(this.$store.state.roomId)
      this.$store.commit('clearChat')
      this.$store.commit('setChatQueue', true)
      this.$router.push('/ads')
      // window.location.pathname = '/ads.html'
    })

    socket.on('message', payload => {
      const msg_ = payload.data.text
      const uid_ = payload.uid
      apiHelper.message(uid_, msg_, this.$store.state.roomId)
      this.$store.commit('addMessage', payload)
      this.scrollChatDown()
    })

    socket.on('typingStatus', payload => {
      this.$store.commit('setPeerTypingStatus', payload)
    })

    socket.on('banned', () => {
      this.$notify({
        group: 'main',
        text: 'הנך חסום , בגלל מספר דיווחים על התנהגותך',
        type: 'error'
      })
    })

    this.getPopularGifs()
  },
  mounted: function () {
    if (this.isIOS) {
      this.$store.commit('setWindowMaxHeight', document.querySelector('.wrapper').clientHeight)

      document.body.style.height = `${this.$store.state.window.maxHeight}px`
      document.querySelector('.wrapper').style.height = `${this.$store.state.window.maxHeight}px`
    }
  },
  beforeDestroy: function () {
    socket.close()
    socket = null
    this.$store.commit('clearChat')
    this.$store.commit('setChatQueue', true)

    document.body.style.height = null
    document.querySelector('.wrapper').style.height = null
  },
  methods: {
    openEmojiBox: function (e) {
      e.preventDefault()

      this.$store.commit('setEmojiVisibility', !this.$store.state.emoji.visible)
    },
    getPopularGifs: async function () {
      try {
        const popularGifsResponse = await axios.get('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'fCluNP2WYQOBvk1Tp2kQQG21Ca9wMXHC',
            limit: 25
          }
        })

        if (popularGifsResponse.status !== 200) {
          throw new Error('[GIPHY] Cant access to the server')
        }

        if (popularGifsResponse.data.data.length === 0) {
          throw new Error('[GIPHY] שום דבר לא נמצא')
        }

        const popularGifs = popularGifsResponse.data.data.map(popularGifItem => {
          return {
            original: popularGifItem.images.original.url,
            fixed_height: popularGifItem.images.fixed_height.url,
            id: popularGifItem.id
          }
        })

        this.$store.commit('setEmojiLoading', false)
        this.$store.commit('setPopularGifs', popularGifs)
      } catch (error) {
        this.$store.commit('setEmojiLoading', false)
        this.$store.commit('setPopularGifs', [])
        console.error(error.message)
      }
    },
    searchGifs: _.debounce(async function () {
      const q = this.searchGifQuery

      try {
        const searchGifsResult = await axios.get('https://api.giphy.com/v1/gifs/search', {
          params: {
            api_key: 'fCluNP2WYQOBvk1Tp2kQQG21Ca9wMXHC',
            q,
            limit: 10,
            offset: this.$store.state.emoji.searchOffset
          }
        })

        if (searchGifsResult.status !== 200) {
          throw new Error('[GIPHY] Status code not 200')
        }

        if (searchGifsResult.data.data.length === 0 && this.$store.state.emoji.seachOffset === 0) {
          throw new Error('[GIPHY] שום דבר לא נמצא')
        }

        const gifs = searchGifsResult.data.data.map(gif => {
          return {
            original: gif.images.original.url,
            fixed_height: gif.images.fixed_height.url,
            id: gif.id
          }
        })

        this.$store.commit('setEmojiLoading', false)
        this.$store.commit('setGifs', gifs)
      } catch (error) {
        this.$store.commit('setEmojiLoading', false)
        this.$store.commit('clearGifs')
        console.error(error.message)
      }
    }, 300),
    handleScroll: function (e) {
      const height = e.target.scrollHeight
      const offsetHeight = e.target.offsetHeight
      const scrollTop = e.target.scrollTop

      if ((height - offsetHeight) <= scrollTop * 2) {
        this.$store.commit('setSearchOffset', this.$store.state.emoji.searchOffset + 10)
        this.searchGifs()
      }
    },
    handleSubmit: function (e) {
      e.preventDefault()

      if (this.message.length > 0) {
        const newMessage = {
          type: 'text',
          uid: this.$store.state.chat.currentUser.id,
          data: {
            text: this.message
          }
        }

        clearTimeout(typingTimeout)
        this.typingTimeoutHandler()
        socket.emit('message', newMessage)
        // this.$store.commit('addMessage', newMessage)
        this.$store.commit('setMessage', '')
        this.scrollChatDown()
      } else {
        this.$notify({
          group: 'main',
          text: 'אנא הכנס הודעה',
          type: 'warn'
        })
      }

      this.$refs.chatInput.focus()
    },
    handleButtonSubmit: function (e) {
      if (this.$parent.$refs.wrapper.classList.contains('ios')) {
        e.preventDefault()
        this.$refs.chatInput.focus()
      }
    },
    handleSendGif: function (gif, e) {
      e.preventDefault()

      let recentGifs = JSON.parse(localStorage.getItem('recent_gifs') || '[]')

      if (recentGifs && recentGifs.length < 20) {
        recentGifs.push(gif)
        recentGifs = _.uniqBy(recentGifs, 'id')
      }

      this.$store.commit('setRecentGifs', recentGifs)
      localStorage.setItem('recent_gifs', JSON.stringify(recentGifs))

      const newMessage = {
        type: 'gif',
        uid: this.$store.state.chat.currentUser.id,
        data: {
          gif
        }
      }

      // this.$store.commit('addMessage', newMessage)
      socket.emit('message', newMessage)
      this.scrollChatDown()

      this.$store.commit('setEmojiVisibility', false)
    },
    handleLeave: function (e) {
      e.preventDefault()

      socket.emit('leaveRoom')
    },
    handleGifLoad: function (e) {
      this.scrollChatDown()
    },
    reportPeer: function (e) {
      e.preventDefault()

      if (this.$store.state.chat.peer) {
        socket.emit('report', this.$store.state.chat.peer.id)
        apiHelper.report(this.$store.state.roomId)
        this.$notify({
          group: 'main',
          text: 'המשתמש דווח, תודה על הדיווח',
          type: 'success'
        })

        socket.emit('leaveRoom')
      } else {
        console.error('No peer exist')
      }
    },
    reportFake: function (e) { // HISTORY: move behavior (apiHelper + socket.emit + notify) to the report modal
      this.showModal = true // jshint ignore:line

      // apiHelper.report(this.$store.state.roomId) // moved
      // socket.emit('leaveRoom') // moved
      // this.$notify({ // moved
      //   group: 'main',
      //   text: 'המשתמש דווח, תודה על הדיווח',
      //   type: 'success'
      // })
    },
    reportFakeAction: function (e) {
      const reportType = this.$store.state.reportType
      const reportText = this.$store.state.reportText
      console.log(reportType, reportText)
      apiHelper.report(this.$store.state.roomId, reportType, reportText)
      socket.emit('leaveRoom')
      this.$notify({
        group: 'main',
        text: 'המשתמש דווח, תודה על הדיווח',
        type: 'success'
      })
    },
    updateReportReason: function (value) {

    },
    scrollChatDown: function () {
      setTimeout(() => {
        this.$refs.chatScroll.scrollTo({
          top: this.$refs.chatScroll.scrollHeight,
          behavior: 'smooth'
        })
      }, 200)
    },
    chatInputFocus: function (e) {
      console.log('Focus')

      if (this.$parent.$refs.wrapper.classList.contains('ios')) {
        setTimeout(() => {
          let offset = this.$store.state.window.maxHeight - window.pageYOffset

          if (offset === this.$store.state.window.maxHeight) {
            offset = this.$parent.$refs.wrapper.clientHeight
          }

          if (!offset) {
            offset = this.$store.state.window.maxHeight
          }

          document.body.style.height = `${offset}px`
          this.$parent.$refs.wrapper.style.height = `${offset}px`

          window.scrollBy(0, -this.$store.state.window.maxHeight + offset)
        }, 200)
      }

      setTimeout(() => {
        this.scrollChatDown()
      }, 100)
    },
    chatInputBlur: function (e) {
      console.log('Blur')

      if (this.$parent.$refs.wrapper.classList.contains('ios')) {
        setTimeout(() => {
          document.body.style.height = `${this.$store.state.window.maxHeight}px`
          this.$parent.$refs.wrapper.style.height = `${this.$store.state.window.maxHeight}px`
        }, 200)
      }
    },
    chatInputClick: function (e) {
      setTimeout(() => {
        this.scrollChatDown()
      }, 100)
    },
    chatInputKeyUp: function (e) {
      if (this.$store.state.chat.typing === false) {
        this.$store.commit('setTypingStatus', true)
        socket.emit('isTyping', true)
        typingTimeout = setTimeout(this.typingTimeoutHandler, 2000)
      } else {
        clearTimeout(typingTimeout)
        typingTimeout = setTimeout(this.typingTimeoutHandler, 2000)
      }
    },
    typingTimeoutHandler: function () {
      this.$store.commit('setTypingStatus', false)
      socket.emit('isTyping', false)
    },
    goToHome: function (e) {
      e.preventDefault()
      localStorage.removeItem('nickname')
      this.$store.commit('setNickname', '')
      this.$router.push('/')
    }
  },
  computed: {
    message: {
      get () {
        return this.$store.state.chat.message
      },
      set (value) {
        this.$store.commit('setMessage', value)
      }
    },
    searchGifQuery: {
      get () {
        return this.$store.state.emoji.query
      },
      set (value) {
        if (value.length > 0) {
          this.$store.commit('setEmojiLoading', true)
          this.$store.commit('setSearchGifQuery', value)
          this.$store.commit('clearGifs')
          this.$store.commit('setSearchOffset', 0)
          this.searchGifs()
        } else {
          this.$store.commit('setEmojiLoading', false)
          this.$store.commit('setSearchGifQuery', value)
          this.$store.commit('clearGifs')
          this.$store.commit('setSearchOffset', 0)
        }
      }
    },
    isIOS: function () {
      return /iPad|iPhone|iPod/.test(navigator.platform || '')
    }
  },
  components: {
    message: Message,
    LoadingCircle
  } // ModalReport
}
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 196px;

  .loading-text {
    font-size: 1.2rem;
    font-weight: 500;
    color: #3C5A7F;
    text-align: center;
  }
}

.card {
  background: #fff;

  .card-navigation {
    display: flex;
    justify-content: space-between;

    .card-navigation-item {
      display: inline-block;
      padding: 0 8px;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      color: #3C5A7F;
    }

    .card-navigation-item__left {

    }
  }
}

@media (min-width: 480px) {
  .card {
    border-radius: 8px;
  }
}

.messenger {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;

  .messenger-header {
    position: relative;
    margin-top: 8px;
    margin-bottom: 4px;

    .messenger-header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .messenger-header-subject {
      display: flex;

      .messenger-header-subject-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #F3F8FF;
        border: 3px solid #F3F8FF;

        img {
          width: 100%;
          height: auto;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .messenger-header-subject-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 88px;
        margin-inline-start: 8px;
      }

      .messenger-header-subject-name {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        color: #2D4B71;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .messenger-header-subject-status {
        margin: 0;
        font-size: .89rem;
        color: #6D8FBA;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .messenger-header-action {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);

      button {
        width: 52px;
        max-width: 52px;
        height: 52px;
        max-height: 52px;
        padding: 0;
        background: #ED3416;
        border: 3px solid #fff;
        border-radius: 50%;
        font-size: 10px;
        font-weight: 500;
        text-align: center;
        color: #fff;
        outline: none;
        cursor: pointer;
        box-shadow: 0 0 8px rgba(237, 55, 22, .48);
      }
    }

    .messenger-header-companion {
      display: flex;

      .messenger-header-companion-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #F3F8FF;
        border: 3px solid #F3F8FF;

        img {
          width: 100%;
          height: auto;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .messenger-header-companion-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 88px;
        margin-inline-end: 8px;
        text-align: end;
      }

      .messenger-header-companion-name {
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        color: #2D4B71;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .messenger-header-companion-status {
        margin: 0;
        font-size: .89rem;
        color: #6D8FBA;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .messenger-header-status {
      flex: 1;

      p {
        text-align: center;
        font-weight: 500;
      }
    }
  }

  .messenger-content {
    height: 100%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #f3f8ff;
    background-image: url("../assets/img/background/background__chat.png");
    background-size: cover;
    background-position: center center;

    .messenger-content-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 20px 16px 20px;
    }

    .messenger-content-status {
      padding: 8px;

      p {
        margin: 0;
        font-size: 0.85rem;
        text-align: center;
        color: #b9cade;
      }
    }

    .messenger-content-list {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      overflow: auto;
      height: 1px;
    }

    .messenger-content-input {
      position: relative;
      margin-top: 16px;

      input[type="text"] {
        width: 100%;
        padding: 22px 16px 22px 104px;
        border: 0;
        border-radius: 31px;
        outline: none;
        background: #fff;
      }

      input[type="text"]::placeholder {
        font-size: 1.15rem;
        color: #d5d5d5;
      }

      .messenger-content-input-button__send {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        min-width: 62px;
        width: 62px;
      }

      .messenger-content-input-button__emoji {
        position: absolute;
        left: calc(62px + 4px);
        top: calc(50% - 16px);
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border: 0;
        border-radius: 50%;
        padding: 0;
        appearance: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        transition: background ease-in 0.2s;
      }

      .messenger-content-input-button__emoji__active {
        background: rgba(0, 0, 0, 0.06);
      }

      .messenger-content-input-button__emoji > i {
        color: #d5d5d5;
        font-size: 1.25rem;
      }

      .messenger-content-emoji-box {
        position: absolute;
        top: -288px;
        left: 0;
        width: 240px;
        height: 280px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
        z-index: 10;

        .messenger-content-emoji-box-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .messenger-content-emoji-box-search {
          padding: 4px;

          input {
            padding: 8px 12px;
            border-radius: 4px;
            background: #eeeeee;
            color: #2d4b71;
          }
        }

        .messenger-content-emoji-box-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px;
          max-height: calc(280px - 42px - 42px);

          .messenger-content-emoji-box-content-message {
            font-size: 1.1rem;
            font-weight: 500;
            color: #6d8fba;
            text-align: center;
          }

          .messenger-content-emoji-box-content-text {
            margin: 4px 0;
            color: #6d8fba;
            font-weight: 500;
          }

          .messenger-content-emoji-box-content-results {
            height: 100%;
            width: 100%;
            overflow: auto;

            .messenger-content-emoji-box-content-results-item {
              display: inline-block;
              width: 100%;
              padding: 4px;
              height: 100px;
              max-height: 100px;

              img {
                border-radius: 4px;
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }

          .messenger-content-emoji-box-content-emojis {
            width: 100%;
            height: 100%;
            overflow: auto;
            display: inline-flex;
            flex-wrap: wrap;

            .emoji {
            }
          }
        }

        .messenger-content-emoji-box-tabs {
          background: #eeeeee;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;

          .messenger-content-emoji-box-tabs-item {
            display: inline-block;
            padding: 12px 8px;
            text-decoration: none;
            color: #6d8fba;
            font-weight: 500;
          }

          .messenger-content-emoji-box-tabs-item:hover {
            background: #e0e0e0;
          }

          .messenger-content-emoji-box-tabs-item__active {
            background: #fff;
            cursor: default;
          }

          .messenger-content-emoji-box-tabs-item__active:hover {
            background: #fff;
          }

          .messenger-content-emoji-box-tabs-item:first-child {
            border-bottom-right-radius: 8px;
          }
        }
      }

      .messenger-content-emoji-box__visible {
        z-index: 1;
        opacity: 1;
      }
    }
  }
}

@media (min-width: 992px) {
  .messenger {

    .messenger-header {
      margin-top: 0;

      .messenger-header-action {
        button {
          width: 72px;
          max-width: 72px;
          height: 72px;
          max-height: 72px;
          font-size: 14px;
        }
      }

      .messenger-header-subject-avatar {
        width: 52px !important;
        height: 52px !important;
      }

      .messenger-header-companion-avatar {
        width: 52px !important;
        height: 52px !important;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .24s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 360px;
  margin: 0px auto;
  /*padding: 20px 30px;*/
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  background-image: -webkit-linear-gradient(
    0deg,
    rgb(237, 86, 142) 0%,
    rgb(116, 107, 197) 49%,
    rgb(29, 122, 238) 100%
  );
  background-image: -moz-linear-gradient(
    0deg,
    rgb(237, 86, 142) 0%,
    rgb(116, 107, 197) 49%,
    rgb(29, 122, 238) 100%
  );

  background-image: -ms-linear-gradient(
    0deg,
    rgb(237, 86, 142) 0%,
    rgb(116, 107, 197) 49%,
    rgb(29, 122, 238) 100%
  );

  border-radius: 5px 5px 0px 0px;
  margin: 0;
}

.modal-header h3 {
  margin-top: 0;
  color: white;
  text-align: center;
  padding: 10px;
}

.modal-body {
  margin: 20px 20px;
}

.modal-body form label {
  font-size: 17px;
  color: rgb(72, 104, 144);
}

.modal-default-button {
  background: linear-gradient(90deg, #ed568e 0, #746bc5 50%, #1d7aee);
  border-radius: 15px;
  font-size: 17px;
  border: 0px;
  padding: 10px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
}
.modal-second-button {
  border-color: rgb(31, 122, 237);
  border-width: 2px;
  background-color: transparent;
  border-radius: 15px;
  font-size: 17px;
  padding: 10px 30px;
  color: rgb(31, 122, 237);
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  margin-bottom: 5px;
}

.modal-footer {
  text-align: center;
}
.attention {
  font-size: 13px;
  color: rgb(72, 104, 144);
  padding: 0;
}

.why {
  font-size: 17px;
  color: rgb(72, 104, 144);
  font-weight: bold;
}
textarea {
  border-width: 2px;
  border-color: rgb(219, 227, 238);
  border-style: solid;
  border-radius: 11px;
  background-color: rgb(255, 255, 255);
  width: 300px;
  margin-bottom: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 360px;
  margin: 0px auto;
  /*padding: 20px 30px;*/
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  background-image: -webkit-linear-gradient(
    0deg,
    rgb(237, 86, 142) 0%,
    rgb(116, 107, 197) 49%,
    rgb(29, 122, 238) 100%
  );
  background-image: -moz-linear-gradient(
    0deg,
    rgb(237, 86, 142) 0%,
    rgb(116, 107, 197) 49%,
    rgb(29, 122, 238) 100%
  );

  background-image: -ms-linear-gradient(
    0deg,
    rgb(237, 86, 142) 0%,
    rgb(116, 107, 197) 49%,
    rgb(29, 122, 238) 100%
  );

  border-radius: 5px 5px 0px 0px;
  margin: 0;
}

.modal-header h3 {
  margin-top: 0;
  color: white;
  text-align: center;
  padding: 10px;
}

.modal-body {
  margin: 20px 20px;
}

.modal-body form label {
  font-size: 17px;
  color: rgb(72, 104, 144);
}

.modal-default-button {
  background: linear-gradient(90deg, #ed568e 0, #746bc5 50%, #1d7aee);
  border-radius: 15px;
  font-size: 17px;
  border: 0px;
  padding: 10px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
}
.modal-second-button {
  border-color: rgb(31, 122, 237);
  border-width: 2px;
  background-color: transparent;
  border-radius: 15px;
  font-size: 17px;
  padding: 10px 30px;
  color: rgb(31, 122, 237);
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  margin-bottom: 5px;
}

.modal-footer {
  text-align: center;
}
.attention {
  font-size: 13px;
  color: rgb(72, 104, 144);
  padding: 0;
}

.why {
  font-size: 17px;
  color: rgb(72, 104, 144);
  font-weight: bold;
}
textarea {
  border-width: 2px;
  border-color: rgb(219, 227, 238);
  border-style: solid;
  border-radius: 11px;
  background-color: rgb(255, 255, 255);
  width: 300px;
  margin-bottom: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
