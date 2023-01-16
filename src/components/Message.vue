<template>
  <transition name="fade">
    <div :class="owned ? 'messenger-content-list-item messenger-content-list-item__owned' : 'messenger-content-list-item'">
        <p v-if="message.type === 'text'" class="messenger-content-list-item-text">
          {{message.data.text}}
        </p>

        <div v-if="message.type === 'gif'" class="messenger-content-list-item-image">
          <img :src="message.data.gif.original" :alt="`GIPHY GIF ${message.data.gif.id}`" @load="imgOnLoad" >
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: Object,
    ownerId: String,
    imgOnLoad: Function
  },
  computed: {
    owned: {
      get () {
        return this.ownerId === this.message.uid
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .messenger-content-list-item {
    display: inline-block;
    width: auto;
    max-width: 65%;
    align-self: flex-end;
    padding: 6px 8px;
    background: #fff;
    border-radius: 6px;
    margin-bottom: 8px;

    .messenger-content-list-item-text {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
      color: #637b9a;
      overflow-wrap: break-word;
    }

    .messenger-content-list-item-image {
      width: 100%;

      img {
        border-radius: 4px;
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  }

  .messenger-content-list-item:last-child {
    margin-bottom: 0;
  }

  .messenger-content-list-item__owned {
    margin-right: 12px;
    position: relative;
    align-self: flex-start;
    background: #b4cbee;
    border-top-right-radius: 0;

    .messenger-content-list-item-text {
      color: #fff;
    }
  }

  .messenger-content-list-item__owned::after {
    position: absolute;
    top: 6px;
    right: -18px;
    width: 0;
    height: 0;
    border-left: 12px solid #b4cbee;
    border-right: 12px solid transparent;
    border-top: 12px solid transparent;
    transform: rotate(90deg);
    clear: both;
    content: "";
  }
</style>
