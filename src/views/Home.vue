<template>
  <div class="card">
    <form class="form stepper">
      <!-- Part 1 -->
      <div v-if="step === 0" class="stepper-item">
        <div class="form-group form-group__text">
          <label for="nickname">בחר שם:</label>
          <input type="text" id="nickname" name="nickname" placeholder="הקלד שם..." v-model.trim="$v.nickname.$model">
        </div>
      </div>

      <!-- Part 2 -->
      <div v-if="step === 1" class="stepper-item">
        <div class="stepper-item-title">אנא אשר שקראת את התקנון...</div>
        <div class="scroller">
          <div class="scroller-container" @scroll.passive="rulesScroll">
            <h3>תקנון סוויצ'אט</h3>

            <h4>כללי</h4>

            <p>1. ברוכים הבאים לאתר Skippi שכתובתו ברשת האינטרנט:  www.skippi.net  (להלן: "האתר" ו/או "סקיפי"), המופעל ע"י חברת קונטרה פרסום ואסטרטגיה בע"מ (להלן: "החברה").</p>
            <p>2. האתר הוקם כדי לאפשר פלטפורמה חברתית לשיח בין זרים באמצעות הצ'אט (להלן: "הצ'אט").</p>
            <p>3. המידע ו/או השימוש באתר כפופים לתנאים, ההגבלות והאחריות כמפורט להלן. ידוע למשתמש באתר כי החברה רשאית לשנות מעת לעת את תנאי התקנון והשירותים המוצעים באתר על תנאיהם והיקפם.</p>
            <p>4. בכל מקום בו ההפניה הינה בלשון זכר הכוונה היא לגברים ונשים כאחד, הדבר נעשה מטעמי נוחות בלבד.</p>

            <h4>קבלת תנאי השימוש</h4>

            <p>5. המשתמש באתר מאשר כי קרא את תקנון האתר, ומקבל על עצמו את התנאים המפורטים בתקנון זה, לעיל ולהלן.</p>
            <p>6. התנאים המפורטים להלן חלים בנוסף לתנאים המפורטים באתר עצמו, בכל מקרה של סתירה בין האמור באתר לבין התקנון, יגברו הוראות התקנון, כמפורט לעיל ולהלן.</p>
            <p>7. בכל מקרה של סתירה בין הוראות  התקנון זה לבין האמור בכל דרך פרסומית אחרת, בין על ידי החברה ובין על ידי המפרסמים באתר, בדבר השירותים המפורסמים באתר, יגברו הוראות תקנון.</p>
            <p>8. המידע המופיע באתר מתעדכן מעת לעת ועל-כן אין להסתמך על מידע ישן ו/או מידע שאינו עדכני לחלוטין, ובמקרה של ספק או סתירה יש ליצור קשר ישיר עם החברה, עפ"י דרכי ההתקשרות המפורטים להלן.</p>

            <h4>כללי התנהגות והשימוש בצ'אט</h4>

            <p>9. אתר סוויצ'אט קם במטרה להוות זירת שיח ברשת האינטרנט ולחבר בין משתמשיו באמצעות הצ'אט, בהתאם לכך המשתמש מתחייב שלא להפר את תנאי ההתנהגות להלן:</p>
            <p>10. השימוש באתר כפוף להוראות כל דין ולתנאי השימוש לעיל ולהלן.</p>
            <p>11. חל איסור לפרסם באתר מסרים המכילים מפגעי מחשב לרבות רוגלות ("וירוסים") מכל סוג שהוא.</p>
            <p>12. חל איסור לפרסם או לשדר דרך באתר חומר אשר מפר בכל דרך שהיא זכויותיו של צד ג' או כל חומר לא-חוקי או בניגוד לדין, מאיים, פוגעני, מטעה, מעליב, משמיץ, דוחה, חודר/מפר פרטיות, וולגרי, גס, מגונה או באופן אחר מעורר התנגדות, מעודד התנהגות פלילית, מקים עוולה אזרחית ו/או שמפר בדרך אחרת כל חוק ו/או דין ו/או אשר מכיל דבר פרסום או שידול.</p>
            <p>13. חל איסור על המשתמש לפרסם או לשדר חומר מסחרי ו/או פרסומי, מבלי שיקבל לרשותו אישור מפורש ובכתב מהחברה.</p>
            <p>14. חל איסור לפעול באתר באופן שמפריע או מונע ממשתמש אחר לעשות שימוש באתר.</p>
            <p>15. חל איסור לפרסם או לשדר בכל דרך אחרת בצ'אט פרטים מזהים ו/או פרטים אישיים אחרים של המשתמש עצמו או של אחר, לרבות כתובות, מספרי טלפון ומידע מזהה כיוצא בזה.</p>
            <p>16. החברה מעודדת את משתמשי האתר להתייחס בזהירות ובביקוריתיות לתכנים שמפרסמים משתמשי האתר בצ'אט. תכנים אלה אינם מתפרסמים מטעמה של החברה, ולפיכך היא אינה תהיה אחראית למהימנותם, אמינותם, דיוקם או שלמותם, והחברה אינה אחראית לכל לכל תוצאה שתיגרם מהשימוש בהם או מההסתמכות עליהן.</p>
            <p>17. החברה שומרת לעצמה את הזכות להסיר מסרים אשר פרסומם ו/או שידורם מפר את הוראות התקנון, זאת גם ללא הודעה מוקדמת כלשהי או הודעה כלל.</p>
            <p>18. הפרה של הכללים לעיל תאפשר לחברה לחסום את המשתמש מלגלוש באתר לאלתר וללא הודעה מוקדמת על פי שיקול דעתה של החברה, לרבות מיצוי זכויות משפטיות של החברה כלפי המשתמש.</p>

            <h4>התחייבות המשתמש</h4>

            <p>19. הגלישה באתר והשימוש בצ'אט ו/או הפרטים המופיעים בו, לרבות פרסומים הינם באחריות המשתמש באתר.</p>
            <p>20. המשתמש מצהיר כי ידוע שהשירותים הניתנים באתר ניתנים לשימוש כמות שהם, ולא תהיה לו כל טענה, תביעה או דרישה כלפי החברה בגין אופיים של השירותים שמציע האתר, או בגין פרסום פרטים או מידע מטעם משתמש אחר באתר.</p>
            <p>21. המשתמש מתחייב שלא להפר את תנאי כללי התנהגות והשימוש בצ'אט כפי שהם מופיעים לעיל.</p>
            <p>22. המשתמש מצהיר כי ידוע לו שחלה עליו האחריות המלאה לכל נזק שיגרם, ישיר או עקיף, כתוצאה מהודעה שפורסמו על ידו, ללא יוצא מן הכלל. השימוש באתר מהווה הסכמה ברורה לכך שידוע לך, כי ככותב ההודעה בצ'אט, הנך האחראי היחיד והישיר על תוכנה של ועל התוצאות הנובעות ממנה.</p>
            <p>23. המשתמש מצהיר כי ידוע לו שהחברה לא תישא באחריות לפעילות בלתי חוקית שנעשתה על ידי משתמשי האתר או כל גורם אחר שאינו בשליטתה המלאה.</p>
            <p>24. החברה לא תשא באחריות לנזק שנגרם למשתמש או לצד ג', כתוצאה ישירה או עקיפה, של שימוש באתר, לרבות נזק שנגרם במהלך ו/או כתוצאה מהשימוש בצ'אט והאינטרקציה עם משתמשים אחרים. המשתמש ישא באחריות באופן בלעדי, ופוטר מראש את החברה באחריותה בעניין.</p>
            <p>25. המשתמש מצהיר כי מתחייב שלא לפגוע בכבודם, פרטיותם של משתמשים אחרים בצ'אט, לרבות אי מסירת פרטים אישיים ו/או מזהים של משתמש אחר.</p>
            <p>26. המשתמש מצהיר כי ידוע לו והוא נותן הסכמתו לכך שישא בשיפוי החברה בגין כל דרישה ו/או תביעה של צד שלישי, לרבות שכ"ט עו"ד, שנובעת משימושו באתר, הפרת תנאי התקנון או זכות אחרת של אדם או תאגיד, על ידו או על ידי משתמש אחר הפועל באמצעות מחשבו.</p>
            <p>27. המשתמש מצהיר כי ידוע לו כי קיימת אפשרות בעתיד כי , האתר לא יהיה זמין באופן זמני או לאורך זמן, בשל צרכי תחזוקה ו/או צרכים נוספים שעשויים להשתנות מעת לעת.</p>

            <h4>קניין רוחני</h4>

            <p>28. מובהר כי זכויות בקניין הרוחני של אתר זה שייכות לחברה בהתאם לדיני זכויות יוצרים התקפים בישראל ועל פי אמנות בינלאומיות.</p>
            <p>29. זכויות היוצרים מתייחסות לטקסט, תמונה, איור, קטעי קול, קטעי וידאו, מוסיקה, יישומי תוכנה וגרפיקה, דמויות ומוצרים המוצעים למכירה לציבור הרחב (להלן: "החומר המוגן").</p>
            <p>30. חל איסור על המשתמש לעשות שימוש מסחרי בחומר המוגן, ובכלל זה אסור להעתיק, להפיץ מחדש, לשדר או לפרסם חומר מוגן ללא הסכמה ובכתב מאת החברה. המשתמש באתר משחרר בזאת את החברה מאחריות, מכל סוג שהוא, לטיב ו/או לאיכות ו/או להתאמת השירות ו/או ההטבה ו/או מימושם בפועל לצרכיו האישיים.</p>
            <p>31. סימני המסחר ומודעות המפרסמים באתר הינם קניינם של המפרסמים בלבד, על כן חל איסור לעשות בהם שימוש בלא הסכמת המפרסם בכתב ומראש.</p>

            <h4>מדיניות פרטיות</h4>

            <p>32. אין המשתמש חייב למסור פרטים כלשהם, אולם יצוין, כי ישנן מקום  והאתר מבקש מסירת פרטים: שם מלא, כתובת דואר אלקטרוני ומספר טלפון נייד, אי מסירת פרטים אלה עלולה להוות מניעה לשימוש באתר, זאת בהתאם לשיקול הדעת של החברה ולמדיניותה כפי שמתעדכנת מעת לעת.</p>
            <p>33. היות והאתר נמצא בסביבה מקוונת שבה אין אפשרות לאבטחה מוחלטת,  משתמש המוסר פרטים באתר זה עושה זאת על אחריותו בלבד.</p>
            <p>34. אתר האינטרנט ו/או החברה ו/או המועדון לא יישאו באחריות לכל נזק ישיר או עקיף, לאבדן הכנסות, להוצאות, לפגיעה בשם טוב, להסתמכות, להפרת חוזה שנגרמו, אם וככל שנגרמו, בשל פגיעה בסודיות פרטי המשתמשים, דליפת פרטי אמצעי תשלום ו/או פרטי ספקים, המשתמש ו/או המפרסם מצהירים כי הם מוותרים על כל טענה בנושא וכי לחברה אין אחריות בנושא.</p>
            <p>35. המשתמש מצהיר כי ידוע לו שביצוע שימוש באתר, מהווה הסכמה של המשתמש לקבל דואר אלקטרוני ו/או מסרונים (SMS) מהחברה, לרבות דואר אלקטרוני ו/או מסרונים (SMS) שמטרתם לעודד רכישת מוצר או שירות, אשר עשוי לכלול עדכונים בנושאים שונים, פרטים על ביצוע עסקה, פרסום וכיוצ"ב, ולרבות מסרים המכילים תוכן העונה על ההגדרה "דבר פרסומת", על פי תיקון 40 לחוק התקשורת (בזק ושידורים), התשמ"ב-1982. המשתמש רשאי, בכל עת, להודיע לחברה המפעילה את אתר האינטרנט על רצונו להסיר את פרטיו מרשימות הדיוור של החברה, ע"י פנייה בכתב לחברה.</p>
            <p>36. בנוסף, החברה תהיה רשאית להשתמש במידע אישי של משתמש שנאסף אגב שימוש באתר לצרכים פנימיים, כגון ניתוח מידע מצרפי בדבר דפוסי רכישה והתנהגות של משתמשים ו/או ספקים, ולצרכי תחקור תלונות ו/או ביקורות, לרבות באמצעות "עוגיות" (cookies) כל משתמש יכול להגדיר מחדש את הדפדפן שלו כך שיסרב לכל  ה-cookies  או שיתריע על cookies שנשלחים אליו. למרות זאת, יש לשים לב שמספר חלקים של האתר עלולים לא לתפקד כראוי אם משתמש מסרב לקבל cookies.</p>
            <p>37. משתמש שיגיש תלונה באמצעות פנייה לחברה כאמור, יחשב כמי שאישר להעביר את פרטיו לצורך בירור תלונתו. יודגש, כי אין באמור משום התחייבות של החברה לטפל בתלונות.</p>
            <p>38. ידוע למשתמש כי החברה המפעילה את האתר יענו לכל בקשה למסירת מידע – כולל מידע אישי ומידע פרטי – אם תוגש בהתאם להליך חוקי, כגון צו חיפוש, צו בית-משפט וכדומה.</p>
            <p>39. קישורים ומפרסמים</p>
            <p>40. האתר כולל תכנים מסחריים, כגון פרסומות ומודעות, הנמסרים לפרסום מטעמם של מפרדמים שונים. תכנים אלה יכולים להיות בטקסט בתמונה או בקול (להלן: "תכנים מסחריים" או "פרסומים").</p>
            <p>41. החברה לא תישא באחריות לתכנים מסחריים, שיפורסמו באתר. החברה אינה בודקת, כותבת, מוודאת או עורכת את תוכן הפרסומים האלה או את אמינותם. האחריות הבלעדית לתכנים המסחררים המפורסמים ולכל תוצאה שתגרם משימוש בהם או הסתמכות עליהם חלה על המפרסמים. </p>
            <p>42. כל עסקה שתיעשה בעקבות תכנים מסחריים שפורסמו באתר תסוכם ישירות בין המשתמש לבין המפרסם. החברה איה צד לעסקה ולא תישא באחריות לשרותים ולטובין שפורסמו.</p>
            <p>43. אין בהסכמת החברה לפרסם תכנים מסחריים של מפרסם באתר כדי להתחייב על כמות החשיפה כתוצאה מהפרסום.</p>
            <p>44. באתר זה יתכנו קישורים (links) לאתרים אחרים. אין בהוראות שלעיל ולהלן כדי לגרוע מהוראות תנאי השימוש באתרים אחרים ואין בהוראות האתרים האחרים משום ביטול ו/או החרגת הוראות תקנון זה.</p>
            <p>45. על המשתמש באתר זה לדאוג לבחון ולקרוא את הוראות האתרים האחרים שבאמצעות קישורים באתר זה ניתן להגיע אליהם.</p>
            <p>46. הקישורים נועדו לנוחות המשתמש בלבד. לעניין קישורים לאתרים חיצוניים, שאינם שייכים לחברה, אם לא צוין אחרת באתר זה, ידוע למשתמש כי אין בין האתר החיצוני המקושר לבין החברה כל יחסים משפטיים או מסחריים ואין לחברה כל שליטה או זכות בחומר הנמצא באתרים אלה.</p>
            <p>47. אין החברה אחראית לתוכן החומר הנמצא באתרי צד שלישי או לתקינות ולתוכן הקישורים, ואין לפרש קישורים לאתרי צד שלישי כמתן אישור, המלצה או העדפה, ע"י החברה, לאותם אתרים מקושרים, לרבות מסמכים וכל חומר אחר הנמצאים בהם, למפעילי האתרים או למוצרים המוצגים בהם.</p>

            <h4>שונות</h4>

            <p>48. הדין החל על הפעולות באתר ועל תנאי שימוש אלה, הוא הדין הישראלי בלבד. סמכות ייחודית ובלעדית לדון בכל תביעה ו/או בקשה העשויה להיות מוגשת בקשר לתקנון זה נתונה לבית משפט בתל- אביב המוסמך לפי העניין.</p>
            <p>49. חוסר התקפות של אחד או יותר מתנאי תקנון זה לא תשפיע על תקפות חוזה זה בכללותו. תנאי שאינו תקף או שלא ניתן לאוכפו יוחלף בתנאי תקף אשר יהיה קרוב ביותר לתנאי המקורי שאותו הוא מחליף, עד כמה שניתן על פי החוק.</p>
            <p>50. פרטי יצירת קשר:<br> קריאת תקנון זה, מהווה תנאי בסיסי לשימוש באתר. משתמש העושה שימוש באתר, מאשר בזאת כי קרא את התקנון, כי הוראותיו מובנים מובנות לו וכי הוא מקבל את התנאים המופיעים בו ללא כל סייג.</p>
          </div>
          <transition name="fade">
            <button v-show="!$store.state.home.rulesBottom" @click="scrollRulesDown" class="scroller-action scroller-action__pulldown">
              <div class="rectangle rectangle__white"></div>
            </button>
          </transition>
        </div>
        <div class="form-group form-group__checkbox">
          <input type="checkbox" id="accept-terms" name="accept-terms" v-model="read">
          <label for="accept-terms">אני מאשר שקראתי את התקנון<span>*</span></label>
        </div>
      </div>

      <div class="stepper-action">
        <button class="button button__primary" @click="next">
          <span v-show="step < 1">חפש צאט</span>
          <span v-show="step >= 1">המשך</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  },
  methods: {
    next: function (e) {
      e.preventDefault()

      if (this.step < 1) {
        if (!this.$v.nickname.$invalid) {
          this.$store.commit('increaseStep')
        } else {
          this.$notify({
            group: 'main',
            text: 'נדרשים לפחות 3 תווים',
            type: 'warn'
          })
        }
      } else {
        if (!this.$v.$invalid && this.read) {
          localStorage.nickname = this.nickname
          this.$router.push('/')
        } else {
          this.$notify({
            group: 'main',
            text: 'אשר שקראת את הכללים',
            type: 'warn'
          })
        }
      }
    },
    rulesScroll: function (e) {
      const height = e.srcElement.scrollHeight
      const offsetHeight = e.srcElement.offsetHeight
      const scrollTop = e.srcElement.scrollTop

      if (height - offsetHeight === scrollTop) {
        this.$store.commit('setRulesBottom', true)
      } else {
        this.$store.commit('setRulesBottom', false)
      }
    },
    scrollRulesDown: function (e) {
      e.preventDefault()

      const rulesScroll = document.querySelector('.scroller-container')

      if (rulesScroll) {
        rulesScroll.scrollBy(0, 32)
      }
    }
  },
  validations: {
    nickname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(18)
    }
  },
  computed: {
    nickname: {
      get () {
        return this.$store.state.nickname
      },
      set (value) {
        this.$store.commit('setNickname', { nickname: value })
      }
    },
    read: {
      get () {
        return this.$store.state.readRules
      },
      set (value) {
        this.$store.commit('readRules', { readRules: value })
      }
    },
    step: {
      get () {
        return this.$store.state.home.step
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    padding: 24px 16px 48px 16px;
    border-radius: 12px;
    background: #fff;
    transition: all 1s;
  }

  .form-group {
    display: flex;
  }

  .form-group__text {
    flex-direction: column;

    label {
      display: inline-block;
      margin-bottom: 4px;
      font-size: 1.6rem;
      font-weight: 500;
      text-align: center;
      color: #486890;
    }

    input[type=text] {
      padding: 20px 12px;
      border: 0;
      border-radius: 8px;
      outline: none;
      background: #F3F8FF;
      transition: background linear .3s;
    }

    input[type=text]:focus {
      background: #ecf4ff;
    }

    input[type=text]::placeholder {
      font-size: 1.2rem;
      color: #BBC8DB;
    }
  }

  .form-group__checkbox {
    flex-direction: row;
    align-items: center;

    label {
      margin-inline-start: 8px;
      font-weight: 500;
      color: #486890;

      span {
       color: #F13232;
      }
    }
  }

  .stepper {

    .stepper-item {

      .stepper-item-title {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 500;
        color: #486890;
      }
    }

    .stepper-action {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateY(50%);
      display: flex;
      justify-content: center;
    }
  }

  .scroller {
    position: relative;
    margin: 16px 0;

    .scroller-container {
      max-height: 160px;
      padding: 4px 8px;
      overflow: auto;
      scroll-behavior: smooth;
      border-radius: 8px;
      background: #F3F8FF;

      p {
        margin: 4px 0;
        font-size: .89rem;
        font-weight: 400;
        color: #9EA9BA;
      }

      h3 {
        margin: 6px 0;
        font-weight: 500;
        color: #9EA9BA;
      }

      h4 {
        margin: 6px 0;
        font-weight: 500;
        color: #9EA9BA;
      }
    }

    .scroller-container::-webkit-scrollbar {
      display: none;
    }

    .scroller-action__pulldown {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      appearance: none;
      outline: 0;
      border: 0;
      padding: 8px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      background: linear-gradient(to right, #ED568E 0%, #746BC5 50%, #1D7AEE 100%);
      cursor: pointer;
      transition: opacity linear .24s;

      .rectangle {
        width: 8px;
        height: 8px;
        background: transparent;
        border: 2px solid transparent;
        transform: rotate(45deg);
      }

      .rectangle__white {
        border-color: #fff;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .32s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
