// import Vue from 'vue'
import Vue from 'vue/dist/vue.js';
import { format } from 'date-fns'

const dateFormat = 'dd. MM. yyyy';
Vue.config.productionTip = false

const scenarios = {
    s: {
        layout: 'tabular',
        msgPrefix: 'SPARK-S:',
        questions: [
            {
                type: "separator",
                text: "Najpogostejši simptomi"
            },
            {
                text: 'Vročina',
            },
            {
                text: 'Suh kašelj'
            },
            {
                text: 'Utrujenost'
            },
            {
                type: "separator",
                text: "Manj pogosti simptomi"
            },
            {
                text: 'Bolečine v mišicah/sklepih'
            },
            {
                text: 'Boleče žrelo'
            },
            {
                text: 'Konjunktivitis'
            },
            {
                text: 'Glavobol'
            },
            {
                text: 'Izguba okusa/vonja'
            },
            {
                text: 'Srbečica/razbarvanost prstov'
            },
            {
                type: "separator",
                text: "Resni simptomi"
            },
            {
                text: 'Težave pri dihanju/izguba sape'
            },
            {
                text: 'Bolečina/pritisk v prsih'
            },
            {
                text: 'Izguba zmožnosti govora/premikanja'
            },
        ]
    },
    p: {
        layout: 'inline',
        questions: [
            {
                text: 'Prvi simptom sem imel/a DATE, kužen/kužna pa bi lahko bil/a že 2 dneva prej.'
            },
            {
                text: 'Nimam simptomov, a mislim, da sem se okužil/a DATE, 3 dni po tem pa bi lahko bil/a kužen/kužna.'
            },
            {
                text: 'Nimam simptomov in ne vem, kdaj sem se okužil/a. (Če boš naknadno zaznal/a simptome, to sporoči svojim kontaktom s »Spark S, covid-spark.info« .)'
            },
        ]

    },
    a: {
        layout: 'inline',
    },
    r: {
        layout: 'inline',
    },
    n: {
        layout: 'inline',
    }
}

const store = {

    state: {},

    loadInitialState(id) {
        this.state = Object.assign({}, scenarios[id])
    }
}

const Question = Vue.component('question', {
    template: `<li v-if>{{ question.text }}</li>`,
    props: {
        'question': Object
    },
})


const Checkbox = Vue.component('checkbox', {
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

const DatePicker = Vue.component('date-picker', {
    template: `<input v-show="question.selected" type="date" :min="min" :max="max" v-model="dateModel"/>`,
    props: {
        daysBack: {
            type: Number,
            default: 14
        },
        question: Object,
    },
    computed: {
        dateModel: {
            get: function () {
                return this.question.date || this.now
            },
            set: function (val) {
                this.$set(this.question, 'date', val)
            },
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

const TabluarQuestion = Vue.component('tabular-question', {
    template: `
    <tr v-if="question.type != 'separator'">
        <td><checkbox :question="question" /></td>
        <td>{{ question.text }}</td>
        <td><date-picker :question="question" /></td>
    </tr>
    <tr v-else>
        <td>{{ question.text }}</td>
        <td></td>
        <td></td>
    </tr>
    `,
    props: {
        question: Object,
    },
})

const Questionare = Vue.component('questionare', {
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
            <question v-for="(q, index) in state.questions" :key="index" :question="q" />
            <date-picker :question="q" />
        </div>
    </section>
    `,
    data() {
        return {
            state: store.state,
        }
    }
})

const SmsPreview = Vue.component('sms-preview', {
    template: `<div>{{ text }}</div>`,
    computed: {
        text() {
            const sb = this.state.questions.filter(q => q.selected && q.date != null).map(q => {
                return `${q.text} (${format(new Date(q.date), dateFormat)})`
            }).join(', ')
            return `${this.state.msgPrefix}: ${sb}`
        }
    },
    data() {
        return {
            state: store.state,
        }
    }
})

const SmsBuilder = Vue.component('sms-builder', {
    template: `
    <div>
        <questionare />
        <sms-preview />
    </div>
    `,
    props: {
        scenario: String
    },
    data() {
        return {
            state: store.state,
        }
    },
    beforeMount() {
        console.log("beforeCreate", this.scenario)
        store.loadInitialState(this.scenario)
    },
    mounted() {
        console.log("scenario", this.scenario)
    }
})

new Vue({
    el: '#sms-builder',
    components: {
        Questionare,
        SmsPreview,
        SmsBuilder,
        Question,
        DatePicker,
        Checkbox
    },
})