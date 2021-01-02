// import Vue from 'vue'
import Vue from 'vue/dist/vue.js'
import { format } from 'date-fns'
import VueI18n from 'vue-i18n'
import VueQrcode from 'vue-qrcode'

Vue.config.productionTip = false
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'sl',
    fallbackLocale: 'sl',
    messages,
})

const dateFormat = i18n.t('dateFormat')

const store = {
    state: {
        controls: {
            gender: undefined,
            useSpecialCharacters: false
        }
    },

    loadInitialState(id) {
        Object.assign(this.state, scenarios[id])
    },

    /**
     * Renders single question text (with user's date)
     * @param Question q 
     */
    renderQuestion(q, gender) {
       
        let tpl = undefined

        if (gender == 'm' && q.textMasculine) {
            tpl = i18n.t(q.textMasculine)
        }else if (gender == 'f' && q.textFemine) {
            tpl = i18n.t(q.textFemine)
        } else {
            tpl = i18n.t(q.text)
        }
        if (tpl.indexOf('<date-picker>') != -1) {
            return tpl.replace('<date-picker> ', format(new Date(q.date), dateFormat))
        } else {
            return `${tpl} (${format(new Date(q.date), dateFormat)})`
        }
    },

    /**
     * Renders message body (according to user's answers)
     */
    renderSMSBody() {
        return this.state.sections.reduce((acc, section) => {
            acc.push(...section.questions.filter(q => q.selected && q.date != null).map(q => this.renderQuestion(q, this.state.controls.gender)))
            return acc
        }, []).join(', ').trim()
    },

    /**
     * Renders whole message with prefix
     */
    renderSMS() {
        return `${this.state.msgPrefix} ${this.renderSMSBody()}`
    }
}

Vue.component('q-checkbox', {
    template: `<span><input :id="id" class="is-checkradio" type="checkbox" v-model="selected" /><label :for="id" class="checkbox">&nbsp;</label></span>`,
    props: {
        question: Object,
        id: String
    },
    computed: {
        selected: {
            get: function () {
                return this.question.selected || false
            },
            set: function (val) {
                this.$set(this.question, 'selected', val)
            }
        }
    }
})

Vue.component('date-picker', {
    template: `<input v-if="show" class="is-primary" type="date" v-model="dateModel" :min="min" :max="max" />`,
    props: {
        daysBack: {
            type: Number,
            default: 14
        },
        question: Object,
        alwaysShow: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        dateModel: {
            get: function () {
                return this.question.date || this.now
            },
            set: function (val) {
                this.$set(this.question, 'date', val)
            },
        },
        show() {
            return this.alwaysShow || this.question.selected === true
        }
    },
    data() {
        const today = new Date();
        const minDate = new Date()
        minDate.setDate(minDate.getDate() - this.daysBack)

        return {
            'now': today.toISOString().substring(0, 10),
            'min': minDate.toISOString().substring(0, 10),
            'max': today.toISOString().substring(0, 10),
        }
    },
    mounted() {
        if (!this.question.date) {
            this.$set(this.question, 'date', this.now)
        }
    }
})

Vue.component('li-question', {
    render(createElement) {
        let translated = this.$t(this.question.text)
        const isInline = translated.indexOf('<date-picker>') > -1

        if (!isInline) {
            translated += ' <date-picker>'
        }

        const datepicker = createElement('date-picker', { props: { question: this.question, alwaysShow: isInline } })

        const parts = translated.split(' ').map((token) => {
            switch (token) {
                case '<date-picker>':
                    return datepicker;
                default:
                    return token
            }
        }).reduce((acc, el) => {
            const last = acc.pop() || ''
            if (typeof (last) != typeof (el)) {
                acc.push(last, el)
                return acc
            } else {
                if (typeof (last) == 'string') {
                    acc.push(`${last} ${el} `)
                } else {
                    acc.push(last, el)
                }
                return acc
            }
        }, [])

        return createElement(
            'li',
            [
                createElement('q-checkbox', { props: { question: this.question, id: this.id } }),
                ...parts
            ]
        )
    },
    props: {
        question: {
            type: Object,
            required: true,
        },
        id: {
            type: String,
            required: true
        }
    },
})

Vue.component('questionare', {
    template: `
    <div class="questionare box">
        <div class="columns is-full is-multiline">
            <div class="column" v-for="(section, sIndex) in state.sections" :key="sIndex">
                <h3 v-if="section.title">{{ $t(section.title) }}</h3>
                <ul>
                    <li-question v-for="(q, qIndex) in section.questions" :key="qIndex" :id="'s-' + sIndex + '-q-' + qIndex" :question="q" />
                </ul>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            state: store.state,
        }
    }
})

Vue.component('sms-preview', {
    template: `
    <div class="box preview">
    <h3>Ustvari SMS</h3>
    <div class="level level-left">
        <div class="level-item">
            <input type="checkbox" id="control-gender-m" class="is-checkradio" v-model="isMale" />
            <label for="control-gender-m">{{ $t('genderMale') }}</label>
            <input type="checkbox" id="control-gender-f" class="is-checkradio" v-model="isFemale" />
            <label for="control-gender-f">{{ $t('genderFemale') }}</label>
        </div>
        <div class="level-item">
            <input type="checkbox" id="control-special-chars" class="is-checkradio" v-model="useSpecialChars" />
            <label class="checkbox" for="control-special-chars">{{ $t('useSpecialCharacters') }}</label>
        </div>
    </div>
    <div class="level">
        <div class="level-item message-container">
            <article class="message">
                <div class="message-header">{{ $t('smsPreview') }}</div>
                <div class="message-body">{{ text }}</div>
            </article>
        </div>
    </div>
    <div class="level">
        <div class="level-item">
            <a class="button" :href="smsLink"><span>{{ $t('sendSMSBtn' )}}</span><span class="icon is-small"><i class="fas fa-envelope"></i></span></a>
        </div>
    </div>
    <div class="level">
        <div class="level-item is-hidden-mobile">
            <vue-qrcode :value="smsLink" />
        <div>
    </div>
    </div>
    </div>
    `,
    components: {
        VueQrcode
    },
    methods: {
        setGender(val) {
            if (this.state.controls.gender === val) {
                this.state.controls.gender = undefined
            } else {
                this.state.controls.gender = val
            }
        }
    },
    computed: {
        text() {
            return store.renderSMS()
        },
        smsLink() {
            return `sms:?body=${encodeURIComponent(store.renderSMS())}`
        },
        isMale: {
            get: function () {
                return this.state.controls.gender == 'm'
            },
            set: function () {
                this.setGender('m')
            }
        },
        isFemale: {
            get() {
                return this.state.controls.gender == 'f'
            },
            set() {
                this.setGender('f')
            }
        },
        useSpecialChars: {
            get() {
                return this.state.controls.useSpecialCharacters
            },
            set(val) {
                this.state.controls.useSpecialCharacters = val
            }
        }
    },
    data() {
        return {
            state: store.state,
        }
    }
})

new Vue({
    el: '#sms-builder',
    template: `
    <section>
        <questionare />
        <sms-preview />
    </section>
    `,
    beforeMount() {
        this.$i18n.locale = this.$el.dataset.locale
        store.loadInitialState(this.$el.dataset.scenario)
    },
    i18n,
})