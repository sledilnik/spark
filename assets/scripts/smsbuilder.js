import Vue from 'vue/dist/vue.js';
import { format } from 'date-fns'
import VueI18n from 'vue-i18n'

const dateFormat = 'dd. MM. yyyy';
Vue.config.productionTip = false
Vue.use(VueI18n)

const store = {
    state: {},

    loadInitialState(id) {
        Object.assign(this.state, scenarios[id])
    },

    /**
     * Renders single question text (with user's date)
     * @param Question q 
     */
    renderQuestion(q) {
        if (q.text.indexOf('<date-picker>') != -1) {
            return q.text.replace('<date-picker> ', format(new Date(q.date), dateFormat))
        } else {
            return `${q.text} (${format(new Date(q.date), dateFormat)})`
        }
    },

    /**
     * Renders message body (according to user's answers)
     */
    renderSMSBody() {
        return this.state.questions.filter(q => q.selected && q.date != null).map(q => {
            return store.renderQuestion(q)
        }).join(', ').trim()
    },

    /**
     * Renders whole message with prefix
     */
    renderSMS() {
        return `${this.state.msgPrefix} ${this.renderSMSBody()}`
    }
}

Vue.component('checkbox', {
    template: `<input type="checkbox" v-model="selected" />`,
    props: {
        question: Object,
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
    render(createElement) {
        return createElement('input', {
            style: {
                display: this.show ? 'inline' : 'none'
            },
            attrs: {
                type: 'date',
                min: this.min,
                max: this.max
            },
            domProps: {
                value: this.dateModel
            }
        })
    },
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

Vue.component('tabular-question', {
    template: `
    <tr v-if="question.text">
        <td><checkbox :question="question" /></td>
        <td>{{ $t(question.text) }}</td>
        <td><date-picker :question="question" :always-show="false" /></td>
    </tr>
    <tr v-else>
        <td>{{ $t(question.title) }}</td>
        <td></td>
        <td></td>
    </tr>
    `,
    props: {
        question: Object,
    },
})

Vue.component('inline-question', {
    render(createElement) {

        const datepicker = createElement('date-picker', { props: { question: this.question } })
        const translated = this.$t(this.question.text)
        const parts = translated.split(' ').map((token) => {
            switch (token) {
                case '<date-picker>':
                    return datepicker;
                default:
                    return token
            }
        }).reduce((acc, el) => {
            const last = acc.pop() || ''
            console.log('reducem', acc, el, last)

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
            'div',
            [
                createElement('checkbox', { props: { question: this.question } }),
                ...parts
            ]
        )
    },
    props: {
        question: Object,
    },
})

Vue.component('questionare', {
    template: `
    <section class="questions">
        <div v-if="state.layout == 'tabular'">
            <table class="table">
                <tbody>
                    <tabular-question v-for="(q, index) in state.questions" :key="index" :question="q" />
                </tbody>
            </table>
        </div>
        <div v-else>
            <inline-question v-for="(q, index) in state.questions" :key="index" :question="q" />
        </div>
    </section>
    `,
    data() {
        return {
            state: store.state,
        }
    }
})

Vue.component('sms-preview', {
    template: `<div>{{ text }}</div>`,
    computed: {
        text() {
            return store.renderSMS()
        }
    },
    data() {
        return {
            state: store.state,
        }
    }
})

Vue.component('sms-builder', {
    template: `
    <div>
        <questionare />
        <sms-preview />
    </div>
    `,
    props: {
        scenario: {
            type: String,
            required: true
        },
        locale: {
            type: String,
            default: 'sl'
        }
    },
    beforeMount() {
        this.$i18n.locale = this.locale
        store.loadInitialState(this.scenario)
    },
})

console.log(messages)

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})

const app = new Vue({
    el: '#sms-builder',
    props: {

    },
    i18n,
})