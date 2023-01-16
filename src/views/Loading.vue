<template>
  <div class="loading-container">
    <LoadingCircle />
  </div>
</template>

<script>
import axios from 'axios'

import LoadingCircle from '@/components/LoadingCircle.vue'

export default {
  components: {
    LoadingCircle
  },
  created: async function () {
    try {
      const serverStatusResponse = await axios.get('https://api.skippi.net/status')

      if (serverStatusResponse.status !== 200) {
        throw new Error('Network error')
      }

      if (serverStatusResponse.data.status === 200) {
        if (localStorage.nickname) {
          this.$store.commit('setNickname', { nickname: localStorage.nickname })
        }

        await setTimeout(() => {
          if (this.$store.state.nickname && this.$store.state.nickname.length > 0) {
            this.$router.push('chat')
          } else {
            this.$router.push('signin')
          }
        }, 1000)
      }
    } catch (error) {
      // move to error page
      console.error(error.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-container {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
