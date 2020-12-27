import * as params from '@params';

console.log("Jaz sem skripta", params.questions);

const elParams = document.getElementById('sms-params');
const elOut = document.getElementById('sms-text');
const inputs = elParams.getElementsByTagName('input')

console.log("inputs", inputs)

for (let input of inputs) {
    console.log(input);
    input.addEventListener('change', (e) => {
        console.log("nekaj spremenjeno")
        generate()
    })
}

function generate() {
    elOut.innerHTML = 'Neki neki'
}