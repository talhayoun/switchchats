<template>
  <div class="ads">
    <div class="ads-text">
      <p>השיחה נגמרה , לחץ על הכפתור לשיחה חדשה</p>
    </div>
    <div class="ads-container">
      <div
        class="OUTBRAIN"
        data-ob-contentUrl="DROP_PERMALINK_HERE"
        data-widget-id="AR_3"
        data-ob-installation-key="ADNIMKAJDGAG4GAO6AGG6H5KP"
      ></div>
    </div>
    <div class="window-action">
      <a href="/" @click="handleLeave" class="button button__primary"
        >התחל שיחה חדשה</a
      >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleLeave: function() {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.ads {
  max-width: 640px;
  .ads-text {
    padding: 8px 12px;
    p {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      text-align: center;
      color: #6d8fba;
    }
  }
  .OUTBRAIN{
    width: 100%;
  }
  .ads-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .ads-item {
      flex: 0 1 calc(30% - 8px);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      margin: 0 4px;
      border: 2px solid #dbe3ee;
      border-radius: 8px;
      overflow: hidden;
      h4 {
        font-size: 1.4rem;
        font-weight: 500;
        color: #dbe3ee;
      }
      .ads-item-container {
        height: 100%;
      }
    }
    .ads-item:last-child {
      flex: 0 1 calc(100% - 8px);
      margin-top: 8px;
      height: 80px;
    }
  }
  .window-action {
    display: flex;
    justify-content: center;
    margin: 16px 0;
  }
}
</style>
