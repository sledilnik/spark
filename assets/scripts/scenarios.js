import { format } from 'date-fns'

// const dateFormat = 'dd. MM. yyyy';
const dateFormat = '{{ T "dateFormat" }}';

class Question extends HTMLElement {

    constructor(props) {
        super();
        this.state = {}
        this.props = props;
        this.prepend(this.render())
    }

    renderSeparator() {
        const sep = document.createElement('h1');
        sep.innerHTML = this.props.text
        return sep;
    }

    renderDatepicker() {
        const now = new Date();
        const minDate = new Date()
        minDate.setDate(minDate.getDate() - 14)

        const datepicker = document.createElement('input');
        datepicker.type = 'date';
        datepicker.min = minDate.toISOString().substring(0, 10);
        datepicker.max = now.toISOString().substring(0, 10);
        datepicker.value = '2020-12-27';
        this.state.date = new Date(datepicker.value);

        datepicker.addEventListener('change', (e) => {
            e.stopPropagation();
            this.state.date = new Date(e.target.value);
            this.dispatchEvent(new Event('change'));
        })
        return datepicker;
    }

    renderText() {

        const isInline = this.props.text.indexOf('DATE') > -1

        if (isInline) {
            const span = document.createElement('span');

            const parts = this.props.text.split('DATE');
            parts.forEach((part, idx) => {
                span.append(document.createTextNode(part));
                if (idx != parts.length - 1) {
                    span.append(this.renderDatepicker());
                }
            })
            return span;
        } else {
            const span = document.createElement('span');
            span.append(document.createTextNode(this.props.text));
            span.append(this.renderDatepicker());
            return span;
        }
    }

    renderInput() {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.addEventListener('change', (e) => {
            e.stopPropagation();
            console.log("event", e.target)
            this.state.selected = e.target.checked;
            this.dispatchEvent(new Event('change'));
        })
        return input;
    }

    renderWrapper() {
        const wrapper = document.createElement('div');
        wrapper.className = "control";
        const label = document.createElement('label');

        wrapper.append(label);
        label.append(this.renderInput())
        label.append(this.renderText())
        return wrapper;
    }

    render() {
        if (this.props.type == 'separator') {
            return this.renderSeparator();
        } else {
            return this.renderWrapper();
        }
    }

    renderSMSPart() {
        if (this.state.selected) {
            if (this.props.text.indexOf('DATE') != -1) {
                return this.props.text.replace('DATE', format(this.state.date, dateFormat))
            } else {
                return `${this.props.text} (${format(this.state.date, dateFormat)})`
            }
        } else {
            return null
        }
    }
}
customElements.define('spark-q', Question);

class SmsBuilder {

    cases = {
        "s": {
            layout: 'tabular',
            questions: [
                {
                    "type": "separator",
                    "text": "Najpogostejši simptomi"
                },
                {
                    "text": 'Vročina'
                },
                {
                    "text": 'Suh kašelj'
                },
                {
                    "text": 'Utrujenost'
                },
                {
                    "type": "separator",
                    "text": "Manj pogosti simptomi"
                },
                {
                    "text": 'Bolečine v mišicah/sklepih'
                },
                {
                    "text": 'Boleče žrelo'
                },
                {
                    "text": 'Konjunktivitis'
                },
                {
                    "text": 'Glavobol'
                },
                {
                    "text": 'Izguba okusa/vonja'
                },
                {
                    "text": 'Srbečica/razbarvanost prstov'
                },
                {
                    "type": "separator",
                    "text": "Resni simptomi"
                },
                {
                    "text": 'Težave pri dihanju/izguba sape'
                },
                {
                    "text": 'Bolečina/pritisk v prsih'
                },
                {
                    "text": 'Izguba zmožnosti govora/premikanja'
                },
            ]
        },
        "p": {
            layout: 'inline',
            questions: [
                {
                    "text": 'Prvi simptom sem imel/a DATE, kužen/kužna pa bi lahko bil/a že 2 dneva prej.'
                },
                {
                    "text": 'Nimam simptomov, a mislim, da sem se okužil/a DATE, 3 dni po tem pa bi lahko bil/a kužen/kužna.'
                },
                {
                    "text": 'Nimam simptomov in ne vem, kdaj sem se okužil/a. (Če boš naknadno zaznal/a simptome, to sporoči svojim kontaktom s »Spark S, covid-spark.info« .)'
                },
            ]

        },
        "a": {
            layout: 'inline',
        },
        "r": {
            layout: 'inline',
        },
        "n": {
            layout: 'inline',
        }
    }

    elements = []

    constructor(caseId) {
        this.caseId = caseId;
        this.elParams = document.getElementById('sms-params');
        this.previewEl = document.getElementById('sms-text');
        this.sendBtn = document.getElementById('sms-btn');

        this.cases[caseId].questions.forEach((q) => {
            const el = new Question(q, this.render);
            el.addEventListener('change', (e) => {
                e.stopPropagation();
                this.render();
            })
            this.elements.push(el);
            this.elParams.append(el);
        });
        
        this.render();
    }

    render() {
        var sb = `SPARK-${this.caseId}`

        this.elements.forEach((el) => {
            const part = el.renderSMSPart();
            if (part) {
                sb += `, ${part}`
            }

        })
        console.log("prevoew render", sb);
        this.previewEl.innerHTML = ""
        this.previewEl.append(document.createTextNode(sb))
    }
}

window.SmsBuilder = SmsBuilder