import * as params from '@params';


// questions are passed as dictionary from template,
// @see content/sms/P.sl.md for example
console.log("Questions", params);

const questions = params.questions;

// render questions to this element
const elParams = document.getElementById('sms-params');

// render preview text to this element
const previewEl = document.getElementById('sms-text');

// render SMS link to href of this element
const sendBtn = document.getElementById('sms-btn')

/**
 * Renders html element for question
 * 
 * @param object question 
 */
function renderQuestion(question) {
    {/* <div class="control">
  <label class="radio">
    <input type="radio" name="answer">
    Yes
  </label>
  <label class="radio">
    <input type="radio" name="answer">
    No
  </label>
</div> */}

    console.log("Render question", question)
    divEl = document.createElement('div')
    divEl.className = "control"


    labelEl = document.createElement('label')
    labelEl.className = "checkbox"
    labelEl.innerHTML = question.text

    inputEl = document.createElement('input')
    inputEl.type = 'checkbox'
    inputEl.name = question.name

    question.state = {
        selected: false,
        text: null
    }
    inputEl.addEventListener('change', (e) => {
        console.log('change event', e.target.value)
        // question.state.selected = e.target.value == 'on'
        // format part of SMS here
        if (e.target.value == 'on') {
            question.state.text = question.text
        } else {
            question.state.text = null
        }
        
        renderSMS();
    });

    labelEl.prepend(inputEl)

    divEl.append(labelEl)

    return divEl;
}

function renderQuestions() {
    questions.forEach(question => {
        elParams.append(renderQuestion(question))
    });
}

function renderSMS() {

    sb = params.smsPrefix

    questions.forEach(question => {
        console.log("Render question", question.state)
        if (question.state.text) {
            sb += `, ${question.state.text}`
        }
    });

    previewEl.innerHTML = sb
    sendBtn.setAttribute('href', `sms:${sb}`) 
}


renderQuestions()
