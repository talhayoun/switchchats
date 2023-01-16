<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>דיווח</h3>
        </div>

        <div class="modal-body" dir="rtl">
          <h3 class="why">מדוע ברצונך לדווח על השותף שלך לשיחה? {{test}}</h3>
          <form>
            <input type="radio" id="one" name="bla" value="One" />
            <label for="one">התחזה לבן אדם אחר</label>
            <br />
            <input type="radio" id="two" name="bla" value="Two" />
            <label for="two">פגע בי מילולית או שאיים לפגוע בי פיזית</label>
            <br />
            <input type="radio" id="three" name="bla" value="Two" />
            <label for="two">אחר</label>
            <br /><br />
            <span class="why"
              >אנא פרט את סיבת הדיווח, כמו מדוע זה קרה, האם האדם הזה יודע
              עליך</span
            >
            <br />
            <textarea></textarea>

            <br />
          </form>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <h4 class="attention">
              שים לב - דיווחים אשר ימצאו שיקריים, יועברו למחלקת החקירות וטיפול
              המשטרה
            </h4>
            <button class="modal-default-button" @click="$emit('close')">
              שלח דיווח
            </button>
            <button class="modal-second-button" @click="$emit('close')">
              סגור
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalReport'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
